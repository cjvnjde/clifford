import {Board} from './Board';
import {Directions} from './constants/Directions';
import {PathFinderToClues} from './PathFinderToClues';
import {
    CLUE_ELEMENTS,
    Elements,
    ENEMY_ELEMENTS,
    LADDER_ELEMENTS,
    RUBBER_ELEMENTS
} from './constants/Elements';
import {Point} from './Point';
import {isCoordinates} from './guards/isCoordinates';

export class DecisionMaker {
    private previousMove: Directions = Directions.STOP;

    public makeDecision(board: Board): Directions {

        const answer = this.killEnemies(board)
            || this.nextMove(board);
            // || this.avoidThieves(board);

        this.previousMove = answer;
        return answer;
    }

    private nextMove(board: Board): Directions {
        const boardString = board.boardAsString();
        const pf = new PathFinderToClues(board);

        const path = pf.findNearestPath(CLUE_ELEMENTS);

        const rows = boardString.split('\n').reverse();
        path.pop();

        path.forEach(({x, y}) => {
            rows[y + 1] = DecisionMaker.replaceAt(rows[y + 1], x, '■');
        });

        console.log(rows.join('\n'));

        return DecisionMaker.getDirection(path, board);
    }

    private static getDirection(path: Point[], board: Board): Directions {
        if (path.length === 0) {
            return Directions.STOP;
        }

        const hero = board.getHero();

        const {x, y} = path.pop() as Point;

        const doubleNext = path[path.length - 1];

        const dx = doubleNext?.x || x;
        const dy = doubleNext?.y || y;

        if (!isCoordinates(hero)) {
            return Directions.STOP;
        }

        const nextBlockType = board.getAt(x, y);
        const dnextBlockType = board.getAt(dx, dy);

        const shouldDestroy = [Elements.BRICK].includes(nextBlockType) && nextBlockType !== Elements.CRACK_PIT;
        const shouldDestroyD = dnextBlockType === Elements.BRICK && dy !== y && !LADDER_ELEMENTS.includes(nextBlockType);

        if (shouldDestroyD) {
            if (x < hero.x) {
                return Directions.CRACK_LEFT;
            } else {
                return Directions.CRACK_RIGHT;
            }
        }

        if (x < hero.x) {
            if (shouldDestroy) {
                return Directions.SHOOT_LEFT;
            } else {
                return Directions.LEFT;
            }
        } else if (x > hero.x) {
            if (shouldDestroy) {
                return Directions.SHOOT_RIGHT;
            } else {
                return Directions.RIGHT;
            }
        } else if (y < hero.y) {
            return Directions.DOWN;
        } else if (y > hero.y) {
            return Directions.UP;
        }

        return Directions.STOP;
    }

    private killEnemies(board: Board): Directions | null {
        const hero = board.getHero();

        let leftX = hero.x - 1;
        let rightX = hero.x + 1;

        let enemyOnTheLeft = false;

        do {
            const leftType = board.getAt(leftX, hero.y);

            enemyOnTheLeft = ENEMY_ELEMENTS.includes(leftType);

            if ([Elements.BULLET, Elements.BRICK, Elements.STONE, ...RUBBER_ELEMENTS].includes(leftType)) {
                break;
            }

            leftX -= 1;
        } while (leftX > 0 && !enemyOnTheLeft);

        let enemyOnTheRight = false;

        do {
            const rightType = board.getAt(rightX, hero.y);

            enemyOnTheRight = ENEMY_ELEMENTS.includes(rightType);

            if ([Elements.BULLET, Elements.BRICK, Elements.STONE, ...RUBBER_ELEMENTS].includes(rightType)) {
                break;
            }

            rightX += 1;
        } while (!enemyOnTheRight && rightX < board.size);

        if (enemyOnTheLeft && this.previousMove !== Directions.SHOOT_LEFT) {
            return Directions.SHOOT_LEFT;
        }

        if (enemyOnTheRight && this.previousMove !== Directions.SHOOT_RIGHT) {
            return Directions.SHOOT_RIGHT;
        }

        return null;
    }

    private avoidThieves(board: Board): Directions {
        console.log(board);
        return Directions.STOP;
    }

    private static replaceAt(str: string, index: number, replacement: string): string {
        if (index >= str.length) {
            return str.valueOf();
        }

        return str.substring(0, index) + replacement + str.substring(index + 1);
    }
}

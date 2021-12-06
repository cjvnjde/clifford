import {Board} from './Board';
import {Directions} from './constants/Directions';
import {PathFinderToClues} from './PathFinderToClues';
import {server} from './server';
import {Coordinates} from './interfaces/Coordinates';
import {
    CLUE_ELEMENTS,
    Elements,
    ENEMY_ELEMENTS,
    LADDER_ELEMENTS
} from './constants/Elements';
import {Point} from './Point';

export function isCoordinates(pet: Coordinates | any): pet is Coordinates {
    return (pet as Coordinates)?.x !== undefined;
}

function getDirection(path: Point[], board: Board): Directions {
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

    const shouldDestroy = [Elements.BRICK, ...ENEMY_ELEMENTS].includes(nextBlockType);
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

function replaceAt(str: string, index: number, replacement: string): string {
    if (index >= str.length) {
        return str.valueOf();
    }

    return str.substring(0, index) + replacement + str.substring(index + 1);
}

export class Solver {
    public solve(board: Board): string {
        const boardString = board.boardAsString();

        server.sendBoard(boardString);

        if (!server.settings.useBot) {
            const move = server.lastMove;
            server.clearLastMove();
            return move;
        }

        const pf = new PathFinderToClues(board);

        const path = pf.findNearestPath(CLUE_ELEMENTS);

        const rows = boardString.split('\n').reverse();
        path.pop();

        path.forEach(({x, y}) => {
            rows[y + 1] = replaceAt(rows[y + 1], x, '■');
        });

        const answer = getDirection(path, board);

        console.log(rows.reverse().join('\n'));
        console.log('Answer: ' + answer);

        return answer;
    }
}

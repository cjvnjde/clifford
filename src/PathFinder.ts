import {Point} from './Point';
import {Board} from './Board';
import {isCoordinates} from './Solver';
import {Elements} from './constants/Elements';

export const transformPath = function transformPath(point: Point): [number, number][] {
    if (!point) {
        return [];
    }

    if (point.from) {
        return [[point.x, point.y], ...transformPath(point.from)];
    }

    return [[point.x, point.y]];
};

export class PathFinder {
    private reachable: Point[] = [];
    private explored: Point[] = [];
    private board: Board;

    constructor(board: Board, initialPoint?: { x: number, y: number }) {
        this.board = board;

        this.init(initialPoint);
    }

    public init(initialPoint?: { x: number, y: number }): void {
        if (initialPoint) {
            this.reachable.push(new Point(initialPoint.x, initialPoint.y));
        } else {
            const hero = this.board.getHero();

            if (isCoordinates(hero)) {
                this.reachable.push(new Point(hero.x, hero.y));
            }
        }
    }

    public isWalkable(cellType: Elements): boolean {
        return ![Elements.BRICK, Elements.STONE].includes(cellType);
    }

    public moveToExplored(point: Point): void {
        this.explored.push(point);
        const pointIndex = this.reachable.findIndex(r => r.x === point.x && r.y === point.y);

        if (pointIndex !== -1) {
            this.reachable.splice(pointIndex, 1);
        }
    }

    public isInExplored(point: Point): boolean {
        return !!this.explored.find(e => e.x === point.x && e.y === point.y);
    }

    public explorePoints(point: Point): void {
        this.moveToExplored(point);
        const x = point.x;
        const y = point.y;

        const currentCellType = this.board.getAt(x, y);
        const underCellType = this.board.getAt(x, y - 1);

        const isOnThePipe = [Elements.HERO_PIPE, Elements.PIPE, Elements.HERO_MASK_PIPE].includes(currentCellType);
        const isOnTheFloor = !this.isWalkable(underCellType)
            || [Elements.LADDER, Elements.HERO_LADDER, Elements.HERO_MASK_LADDER, Elements.OTHER_HERO_LADDER].includes(underCellType);
        const isOnTheLadder = [Elements.LADDER, Elements.HERO_LADDER, Elements.HERO_MASK_LADDER, Elements.OTHER_HERO_LADDER].includes(currentCellType);
        const isOnTheEnemy = [
            Elements.OTHER_HERO_DIE,
            Elements.OTHER_HERO_LADDER,
            Elements.OTHER_HERO_LEFT,
            Elements.OTHER_HERO_RIGHT,
            Elements.OTHER_HERO_FALL,
            Elements.OTHER_HERO_PIPE,
            Elements.OTHER_HERO_PIT,
            Elements.OTHER_HERO_MASK_DIE,
            Elements.OTHER_HERO_MASK_LADDER,
            Elements.OTHER_HERO_MASK_LEFT,
            Elements.OTHER_HERO_MASK_RIGHT,
            Elements.OTHER_HERO_MASK_FALL,
            Elements.OTHER_HERO_MASK_PIPE,
            Elements.OTHER_HERO_MASK_PIT,
            Elements.ENEMY_HERO_DIE,
            Elements.ENEMY_HERO_LADDER,
            Elements.ENEMY_HERO_LEFT,
            Elements.ENEMY_HERO_RIGHT,
            Elements.ENEMY_HERO_FALL,
            Elements.ENEMY_HERO_PIPE,
            Elements.ENEMY_HERO_PIT,
            Elements.ENEMY_HERO_MASK_DIE,
            Elements.ENEMY_HERO_MASK_LADDER,
            Elements.ENEMY_HERO_MASK_LEFT,
            Elements.ENEMY_HERO_MASK_RIGHT,
            Elements.ENEMY_HERO_MASK_FALL,
            Elements.ENEMY_HERO_MASK_PIPE,
            Elements.ENEMY_HERO_MASK_PIT,
            Elements.ROBBER_LADDER,
            Elements.ROBBER_LEFT,
            Elements.ROBBER_RIGHT,
            Elements.ROBBER_FALL,
            Elements.ROBBER_PIPE,
            Elements.ROBBER_PIT,
        ]
            .includes(underCellType);

        const cellR = this.board.getAt(x + 1, y);
        const pointR = new Point(x + 1, y);
        const isWalkableR = this.isWalkable(cellR);

        const canR = isWalkableR && !this.isInExplored(pointR);

        if (((canR && isOnThePipe) || (canR && isOnTheFloor) || (canR && isOnTheLadder) || (isOnTheEnemy && canR))) {
            pointR.setFrom(point);

            this.reachable.push(pointR);
        }

        const cellL = this.board.getAt(x - 1, y);
        const pointL = new Point(x - 1, y);
        const isWalkableL = this.isWalkable(cellL);

        const canL = isWalkableL && !this.isInExplored(pointL) && x > 0;

        if ((canL && isOnThePipe) || (canL && isOnTheFloor) || (canL && isOnTheLadder) || (isOnTheEnemy && canL)) {
            pointL.setFrom(point);

            this.reachable.push(pointL);
        }

        const cellB = this.board.getAt(x, y - 1);
        const pointB = new Point(x, y - 1);

        const isWalkableB = this.isWalkable(cellB);

        const canB = isWalkableB && !this.isInExplored(pointB) && y > 0;
        if (canB) {
            pointB.setFrom(point);

            this.reachable.push(pointB);
        }

        const cellT = this.board.getAt(x, y + 1);
        const pointT = new Point(x, y + 1);
        const isWalkableT = this.isWalkable(cellT);

        const canT = isWalkableT && [Elements.LADDER, Elements.HERO_LADDER].includes(currentCellType) && !this.isInExplored(pointT);

        if (canT) {
            pointT.setFrom(point);

            this.reachable.push(pointT);
        }
    }

    public findPoints(elements = [Elements.CLUE_KNIFE, Elements.CLUE_GLOVE, Elements.CLUE_RING]): Point[] {
        const foundPoints = [];

        do {
            const reachablePoint = this.reachable[0];

            const reachablePointType = this.board.getAt(reachablePoint.x, reachablePoint.y);
            if (elements.includes(reachablePointType)) {
                foundPoints.push(reachablePoint);
                break;
            }

            this.explorePoints(reachablePoint);
        } while (this.reachable.length > 0);

        return foundPoints;
    }

    public findAllPath(elements?: Elements[]): [number, number][][] {
        const points = this.findPoints(elements);

        return points.map(point => {
            return transformPath(point);
        });
    }

    public findNearestPath(elements?: Elements[]): [number, number][] {
        const [point] = this.findPoints(elements);
        return transformPath(point);
    }
}

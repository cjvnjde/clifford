import {Point} from './Point';
import {Board} from './Board';
import {Elements} from './constants/Elements';
import {Coordinates} from './interfaces/Coordinates';
import {transformPath} from './utils';

export abstract class PathFinderBase {
    protected reachable: Point[] = [];
    protected explored: Point[] = [];
    protected board: Board;

    protected constructor(board: Board, initialPoint: Coordinates) {
        this.board = board;

        this.init(initialPoint);
    }

    protected init(initialPoint: Coordinates): void {
        this.reachable.push(new Point(initialPoint.x, initialPoint.y));
    }

    protected isWalkable(cellType: Elements): boolean {
        return ![Elements.BRICK, Elements.STONE].includes(cellType);
    }

    protected moveToExplored(point: Point): void {
        this.explored.push(point);
        const pointIndex = this.reachable.findIndex(r => r.x === point.x && r.y === point.y);

        if (pointIndex !== -1) {
            this.reachable.splice(pointIndex, 1);
        }
    }

    protected isInExplored(point: Point): boolean {
        return !!this.explored.find(e => e.x === point.x && e.y === point.y);
    }

    public abstract explorePoints(point: Point): void;

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

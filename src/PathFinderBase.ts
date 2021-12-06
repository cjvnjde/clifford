import {Point} from './Point';
import {Board} from './Board';
import {Elements, RUBBER_ELEMENTS} from './constants/Elements';
import {Coordinates} from './interfaces/Coordinates';

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
        return ![Elements.BRICK, Elements.STONE, ...RUBBER_ELEMENTS].includes(cellType);
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
            // || !!this.reachable.find(e => e.x === point.x && e.y === point.y);
    }

    public abstract explorePoints(point: Point): void;

    public findPoints(elements: Elements[]): Point[] {
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

    //
    // public findAllPath(elements?: Elements[]): Point[][] {
    //     const points = this.findPoints(elements);
    //
    //     return points.map(point => {
    //         return PathFinderBase.transformPath(point);
    //     });
    // }

    public findNearestPath(elements: Elements[]): Point[] {
        const [point] = this.findPoints(elements);
        return PathFinderBase.transformPath(point);
    }

    protected static transformPath(point: Point): Point[] {
        if (!point) {
            return [];
        }

        if (point.from) {
            return [point, ...PathFinderBase.transformPath(point.from)];
        }

        return [point];
    }
}

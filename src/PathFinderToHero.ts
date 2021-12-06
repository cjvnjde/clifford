import {Point} from './Point';
import {Board} from './Board';
import {PathFinderBase} from './PathFinderBase';
import {Coordinates} from './interfaces/Coordinates';
import {LADDER_ELEMENTS} from './constants/Elements';

export class PathFinderToHero extends PathFinderBase {
    constructor(board: Board, initialPoint: Coordinates) {
        super(board, initialPoint);
    }

    private checkLeft(point: Point): void {
        const x = point.x;
        const y = point.y;

        const cellLeftType = this.board.getAt(x - 1, y);
        const pointL = new Point(x - 1, y);
        const isWalkableL = this.isWalkable(cellLeftType);

        const canMoveLeft = isWalkableL
            && !this.isInExplored(pointL)
            && x > 0;

        // if ((canMoveLeft && isLadderNext) || (canMoveLeft && isPipeNext) || (canMoveLeft && isOnFloorNext)) {
        if (canMoveLeft) {
            pointL.setFrom(point);

            this.reachable.push(pointL);
        }
    }

    private checkRight(point: Point): void {
        const x = point.x;
        const y = point.y;

        const cellRightType = this.board.getAt(x + 1, y);
        const pointR = new Point(x + 1, y);
        const isWalkableR = this.isWalkable(cellRightType);

        const canMoveRight = isWalkableR
            && !this.isInExplored(pointR)
            && x < this.board.size;

        // if ((canMoveRight && isLadderNext) || (canMoveRight && isPipeNext) || (canMoveRight && isOnFloorNext)) {
        if (canMoveRight) {
            pointR.setFrom(point);

            this.reachable.push(pointR);
        }
    }

    private checkBottom(point: Point): void {
        const x = point.x;
        const y = point.y;

        const cellBottomType = this.board.getAt(x, y - 1);
        const pointB = new Point(x, y - 1);

        const isWalkableB = this.isWalkable(cellBottomType);

        const isLadderNext = LADDER_ELEMENTS.includes(cellBottomType);

        const canB = isWalkableB
            && isLadderNext
            && !this.isInExplored(pointB)
            && y > 0;

        if (canB) {
            pointB.setFrom(point);

            this.reachable.push(pointB);
        }
    }

    private checkTop(point: Point): void {
        const x = point.x;
        const y = point.y;

        const cellT = this.board.getAt(x, y + 1);
        const pointT = new Point(x, y + 1);
        const isWalkableT = this.isWalkable(cellT);

        // const canDestroyBrick = this.isWalkable(cellDT);

        const canT = isWalkableT
            && !this.isInExplored(pointT)
            && y < this.board.size;

        if (canT) {
            pointT.setFrom(point);

            this.reachable.push(pointT);
        }
    }

    public explorePoints(point: Point): void {
        this.moveToExplored(point);


        this.checkRight(point);
        this.checkLeft(point);
        this.checkBottom(point);
        this.checkTop(point);
    }
}

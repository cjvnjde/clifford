import {Point} from './Point';
import {Board} from './Board';
import {CHARACTER_ELEMENTS, Elements} from './constants/Elements';
import {PathFinderBase} from './PathFinderBase';
import {includes} from 'lodash';

export class PathFinderToClues extends PathFinderBase {
    constructor(board: Board) {
        const hero = board.getHero();

        super(board, hero);
    }

    public explorePoints(point: Point): void {
        this.moveToExplored(point);
        const x = point.x;
        const y = point.y;

        const currentCellType = super.board.getAt(x, y);
        const underCellType = super.board.getAt(x, y - 1);

        const isOnThePipe = [Elements.HERO_PIPE, Elements.PIPE, Elements.HERO_MASK_PIPE].includes(currentCellType);
        const isOnTheFloor = !this.isWalkable(underCellType)
            || [Elements.LADDER, Elements.HERO_LADDER, Elements.HERO_MASK_LADDER, Elements.OTHER_HERO_LADDER].includes(underCellType);
        const isOnTheLadder = [Elements.LADDER, Elements.HERO_LADDER, Elements.HERO_MASK_LADDER, Elements.OTHER_HERO_LADDER].includes(currentCellType);
        const isOnTheEnemy = includes(CHARACTER_ELEMENTS, underCellType);

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
}

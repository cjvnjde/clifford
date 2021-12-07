import {Point} from './Point';
import {Board} from './Board';
import {CHARACTER_ELEMENTS, Elements, LADDER_ELEMENTS, PIPE_ELEMENTS} from './constants/Elements';
import {PathFinderBase} from './PathFinderBase';
import {includes} from 'lodash';
import {DESTROY_TYPES} from './constants/DestroyTypes';

export class PathFinderToClues extends PathFinderBase {
    private underHeroType: Elements;

    constructor(board: Board) {
        const hero = board.getHero();

        super(board, hero);

        this.underHeroType = board.getAt(hero.x, hero.y - 1);
    }

    private checkLeft(point: Point): void {
        const x = point.x;
        const y = point.y;

        const currentCellType = this.board.getAt(x, y);
        const underCellType = this.board.getAt(x, y - 1);

        const isOnThePipe = PIPE_ELEMENTS.includes(currentCellType);
        const isOnTheFloor = !this.isWalkable(underCellType) || LADDER_ELEMENTS.includes(underCellType);
        const isOnTheLadder = LADDER_ELEMENTS.includes(currentCellType);
        const isOnTheEnemy = includes(CHARACTER_ELEMENTS, this.underHeroType);

        const cellL = this.board.getAt(x - 1, y);
        const pointL = new Point(x - 1, y);
        const isWalkableL = this.isWalkable(cellL);
        const isDestroyable = cellL === Elements.BRICK;

        const canL = (isWalkableL || isDestroyable) && !this.isInExplored(pointL) && x > 0;

        if ((canL && isOnThePipe) || (canL && isOnTheFloor) || (canL && isOnTheLadder) || (isOnTheEnemy && canL)) {
            pointL.setFrom(point);

            if (isDestroyable) {
                pointL.setDestroyType(DESTROY_TYPES.SIDE);
            }

            this.reachable.push(pointL);
        }
    }

    private checkRight(point: Point): void {
        const x = point.x;
        const y = point.y;

        const currentCellType = this.board.getAt(x, y);
        const underCellType = this.board.getAt(x, y - 1);

        const isOnThePipe = PIPE_ELEMENTS.includes(currentCellType);
        const isOnTheFloor = !this.isWalkable(underCellType) || LADDER_ELEMENTS.includes(underCellType);
        const isOnTheLadder = LADDER_ELEMENTS.includes(currentCellType);
        const isOnTheEnemy = includes(CHARACTER_ELEMENTS, this.underHeroType);

        const cellR = this.board.getAt(x + 1, y);
        const pointR = new Point(x + 1, y);
        const isWalkableR = this.isWalkable(cellR);
        const isDestroyable = cellR === Elements.BRICK;

        const canR = (isWalkableR || isDestroyable) && !this.isInExplored(pointR);

        if (((canR && isOnThePipe) || (canR && isOnTheFloor) || (canR && isOnTheLadder) || (isOnTheEnemy && canR))) {
            pointR.setFrom(point);

            if (isDestroyable) {
                pointR.setDestroyType(DESTROY_TYPES.SIDE);
            }

            this.reachable.push(pointR);
        }
    }

    private checkBottom(point: Point): void {
        const x = point.x;
        const y = point.y;
        const currentCellType = this.board.getAt(x, y);
        const underCellType = this.board.getAt(x, y - 1);

        const xFrom = point.from?.x || x;

        const cellB = this.board.getAt(x, y - 1);
        const pointB = new Point(x, y - 1);

        const isWalkableB = this.isWalkable(cellB) && !CHARACTER_ELEMENTS.includes(underCellType);
        const isDestroyable = cellB === Elements.BRICK && !LADDER_ELEMENTS.includes(currentCellType) && xFrom - x !== 0;

        const canB = (isWalkableB || isDestroyable) && !this.isInExplored(pointB) && y > 0;
        if (canB) {
            pointB.setFrom(point);

            if (isDestroyable) {
                pointB.setDestroyType(DESTROY_TYPES.BOTTOM);
            }

            this.reachable.push(pointB);
        }
    }

    private checkTop(point: Point): void {
        const x = point.x;
        const y = point.y;

        const currentCellType = this.board.getAt(x, y);

        const isOnTheLadder = LADDER_ELEMENTS.includes(currentCellType);

        const cellT = this.board.getAt(x, y + 1);
        const pointT = new Point(x, y + 1);
        const isWalkableT = this.isWalkable(cellT);

        const canT = isWalkableT && isOnTheLadder && !this.isInExplored(pointT);

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

import {Coordinates} from './interfaces/Coordinates';
import {DESTROY_TYPES} from './constants/DestroyTypes';

export class Point implements Coordinates {
    public from: Point | null = null;
    public destroyType: DESTROY_TYPES | null = null;

    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public setFrom(point: Point): void {
        this.from = point;
    }

    public setDestroyType(destroyType: DESTROY_TYPES): void {
        this.destroyType = destroyType;
    }
}


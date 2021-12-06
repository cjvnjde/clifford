import {Coordinates} from './interfaces/Coordinates';

export class Point implements Coordinates {
    public from: Point | null = null;
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public setFrom(point: Point): void {
        this.from = point;
    }
}


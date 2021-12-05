export class Point {
    public from: Point | null = null;
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    setFrom(point: Point) {
        this.from = point;
    }
}


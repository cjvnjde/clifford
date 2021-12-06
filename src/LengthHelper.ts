import {Coordinates} from './interfaces/Coordinates';

export class LengthHelper {
    private readonly boardSize: number;

    constructor(boardSize: number) {
        this.boardSize = boardSize;
    }

    private getY(y: number): number {
        return this.boardSize - 1 - y;
    }

    private getX(x: number): number {
        return x;
    }

    public getLength(x: number, y: number): number {
        return this.getY(y) * this.boardSize + this.getX(x);
    }

    public getXY(length: number): Coordinates {
        const x = this.getX(length % this.boardSize);
        const y = this.getY(Math.trunc(length / this.boardSize));

        return {
            x,
            y,
        };
    }
}

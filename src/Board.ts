import {LengthHelper} from "./LengthHelper";
import {Elements} from "./constants/Elements";
import {HERO_ELEMENTS} from "./constants/Elements";

export class Board {
    private readonly board: string;
    private lengthHelper: LengthHelper;

    constructor(boardString: string) {
        this.board = boardString;
        this.lengthHelper = new LengthHelper(this.size)
    }

    get size() {
        return Math.sqrt(this.board.length);
    }

    public getAt(x: number, y: number): Elements {
        return this.board.charAt(this.lengthHelper.getLength(x, y)) as Elements;
    }

    public find(element: Elements): { x: number, y: number } | null {
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] === element) {
                return this.lengthHelper.getXY(i);
            }
        }

        return null;
    }

    public getHero(): { x: number, y: number } | null {
        for (const element of HERO_ELEMENTS) {
            const heroCoords = this.find(element);


            if (heroCoords) {
                return heroCoords;
            }
        }

        return null;
    }

    public boardAsString(): string {
        let result = "";

        for (let i = 0; i < this.size; i++) {
            result += this.board.substring(i * this.size, (i + 1) * this.size);
            result += "\n";
        }

        return result;
    }

    public printBoard(): void {
        console.log(this.boardAsString())
    }
}

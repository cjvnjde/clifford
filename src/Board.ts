import {LengthHelper} from './LengthHelper';
import {CLUE_ELEMENTS, Elements, ENEMY_ELEMENTS, HERO_ELEMENTS} from './constants/Elements';
import {Coordinates} from './interfaces/Coordinates';

export class Board {
    private readonly board: string;
    private lengthHelper: LengthHelper;

    constructor(boardString: string) {
        this.board = boardString;
        this.lengthHelper = new LengthHelper(this.size);
    }

    public get size(): number {
        return Math.sqrt(this.board.length);
    }

    public getAt(x: number, y: number): Elements {
        return this.board.charAt(this.lengthHelper.getLength(x, y)) as Elements;
    }

    public findAll(element: Elements): Coordinates[] {
        const coordinates: Coordinates[] = [];

        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] === element) {
                coordinates.push(this.lengthHelper.getXY(i));
            }
        }

        return coordinates;
    }

    public find(element: Elements): Coordinates | null {
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] === element) {
                return this.lengthHelper.getXY(i);
            }
        }

        return null;
    }

    public getClues(): Coordinates[] {
        const elements: Coordinates[] = [];

        for (const element of CLUE_ELEMENTS) {
            const clueCoords = this.findAll(element);

            elements.push(...clueCoords);
        }

        return elements;
    }

    public getEnemies(): Coordinates[] {
        const elements: Coordinates[] = [];

        for (const element of ENEMY_ELEMENTS) {
            const clueCoords = this.findAll(element);

            elements.push(...clueCoords);
        }

        return elements;
    }

    public getHero(): Coordinates {
        for (const element of HERO_ELEMENTS) {
            const heroCoords = this.find(element);


            if (heroCoords) {
                return heroCoords;
            }
        }

        return {x: 0, y: 0};
    }

    public boardAsString(): string {
        let result = '';

        for (let i = 0; i < this.size; i++) {
            result += this.board.substring(i * this.size, (i + 1) * this.size);
            result += '\n';
        }

        return result;
    }

    public printBoard(): void {
        console.log(this.boardAsString());
    }
}

import {Board} from "./Board";
import {Directions} from "./constants/Directions";
import {PathFinder} from "./PathFinder";

export function isCoordinates(pet: { x: number, y: number} | any): pet is { x: number, y: number} {
    return (pet as { x: number, y: number})?.x !== undefined;
}

function getDirection(path: [number, number][], board: Board) {
    if (path.length === 0) {
        return Directions.STOP;
    }

    const hero = board.getHero();

    // @ts-ignore
    const [x, y] = path.pop();

    if (!isCoordinates(hero)) {
        return Directions.STOP;
    }

    if (x < hero.x) {
        return Directions.LEFT;
    } else if (x > hero.x) {
        return Directions.RIGHT;
    } else if (y < hero.y) {
        return Directions.DOWN;
    } else if (y > hero.y) {
        return Directions.UP;
    }

    return Directions.STOP;
}

 function replaceAt(str: string, index: number, replacement: string) {
    if (index >= str.length) {
        return str.valueOf();
    }

    return str.substring(0, index) + replacement + str.substring(index + 1);
}

export class Solver {
    solve(board: Board): string {
        const boardString = board.boardAsString();

        const pf = new PathFinder(board);

        const path = pf.findNearestPath()

        const rows = boardString.split('\n').reverse()
        path.pop();

        path.forEach(([x, y]) => {
            rows[y + 1] = replaceAt(rows[y + 1], x, '■')
        })

        console.log(rows.reverse().join('\n'))

        const answer = getDirection(path, board);

        console.log("Answer: " + answer);

        return answer;
    }
}

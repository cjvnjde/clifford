import {Board} from './Board';
import {Directions} from './constants/Directions';
import {PathFinder} from './PathFinder';
import {server} from './server';

export function isCoordinates(pet: { x: number, y: number} | any): pet is { x: number, y: number} {
    return (pet as { x: number, y: number})?.x !== undefined;
}

function getDirection(path: [number, number][], board: Board): Directions {
    if (path.length === 0) {
        return Directions.STOP;
    }

    const hero = board.getHero();

    const [x, y] = path.pop() as any;

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

 function replaceAt(str: string, index: number, replacement: string): string {
    if (index >= str.length) {
        return str.valueOf();
    }

    return str.substring(0, index) + replacement + str.substring(index + 1);
}

export class Solver {
    public solve(board: Board): string {
        const boardString = board.boardAsString();

        server.sendBoard(boardString);

        if (!server.settings.useBot) {
            const move = server.lastMove;
            server.clearLastMove();
            return move;
        }

        const pf = new PathFinder(board);

        const path = pf.findNearestPath();

        const rows = boardString.split('\n').reverse();
        path.pop();

        path.forEach(([x, y]) => {
            rows[y + 1] = replaceAt(rows[y + 1], x, '■');
        });

        const answer = getDirection(path, board);

        // console.log(rows.reverse().join('\n'))
        // console.log("Answer: " + answer);

        return answer;
    }
}

import {Board} from './Board';
import {server} from './server';
import {DecisionMaker} from './DecisionMaker';

export class Solver {
    private decisionMaker: DecisionMaker;

    constructor() {
        this.decisionMaker = new DecisionMaker();
    }

    public solve(board: Board): string {
        const boardString = board.boardAsString();

        server.sendBoard(boardString);

        if (!server.settings.useBot) {
            const move = server.lastMove;
            server.clearLastMove();
            return move;
        }

        const nextMove = this.decisionMaker.makeDecision(board);

        console.log('Answer: ' + nextMove);

        return nextMove;
    }
}

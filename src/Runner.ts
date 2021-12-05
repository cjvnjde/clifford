import WebSocket from "ws";
import {Board} from "./Board";
import {Solver} from "./Solver";

export class Runner {
    url: string;
    solver: Solver;

    constructor(serverUrl: string) {
        this.url = serverUrl;
        this.solver = new Solver();
    }

    private get wsUrl(): string {
        return this.url.replace("http", "ws")
            .replace("board/player/", "ws?user=")
            .replace("?code=", "&code=");
    }

    private processBoard(boardString: string): string {
        const board = new Board(boardString);

        return this.solver.solve(board)
    }

    private parseBoard(message: string): string {
        const pattern = new RegExp(/^board=(.*)$/);
        const parameters = message.match(pattern);

        return parameters ? parameters[1] : '';
    }

    public connect(): WebSocket {
        const socket = new WebSocket(this.wsUrl, {rejectUnauthorized: false})

        socket.on('open', () => {
            console.log('Web socket client opened ' + this.url)
        });

        socket.on('error', () => {
            console.log('Web socket client error')
        });

        socket.on('close', () => {
            console.log('Web socket client closed')

            setTimeout(() => {
                this.connect();
            }, 5000);
        });

        socket.on('message', (message) => {
            const board = this.parseBoard(message.toString());
            const answer = this.processBoard(board);

            socket.send(answer);
        });

        return socket;
    }
}

import express, {Express} from 'express';
import path from "path";
import WebSocket, {WebSocketServer} from "ws";
import {Directions} from "./constants/Directions";

export class Server {
    private wss: WebSocketServer;
    private ws: WebSocket | undefined;
    private port = 3000;
    private app: Express;

    public settings = {
        useBot: true,
    }

    public lastMove: Directions = Directions.STOP;

    constructor() {
        this.wss = new WebSocketServer({port: 8080});
        this.app = express();

        this.init()
    }

    private init(): void {
        this.initSocketServer();
        this.initExpressServer();
    }


    private initSocketServer(): void {
        const transformEvent = (eventData: string): void => {
            if (eventData.includes('event:direction::')) {
                const [,direction] = eventData.split('event:direction::');
                this.lastMove = direction as Directions
            }

            if (eventData.includes('event:settings::')) {
                const [,setting] = eventData.split('event:settings::');
                switch (setting) {
                    case 'NOT_BOT': {
                        this.settings.useBot = false;
                        break;
                    }
                    case 'BOT': {
                        this.settings.useBot = true;
                        break;
                    }
                }
            }
        }


        this.wss.on('connection', ws => {
            this.ws = ws;

            ws.on('message',  data => {
                transformEvent(data.toString())
                console.log('received: %s', data);
            });
        });
    }

    private initExpressServer(): void {
        this.app.use(express.static("public"))

        this.app.get( "/", ( req, res ) => {
            res.sendFile(path.join(__dirname, "public", "index.html"));
        } );

        this.app.listen(this.port, () => {
            console.log( `server started at http://localhost:${ this.port }` );
        } );
    }

    public sendBoard(boardAsString: string): void {
        this.ws?.send(`event:board::${boardAsString}`)
    }

    public clearLastMove() {
        this.lastMove = Directions.STOP;
    }
}

export const server = new Server();

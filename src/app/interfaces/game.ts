import { Col } from "./col";

export interface Game {
    _id: string;
    gameId: string;
    stake:number;
    numberMines:number;
    userClick:number;
    playing:boolean;
    completed:boolean;
}
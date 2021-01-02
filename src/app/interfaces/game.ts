import { Col } from "./col";

export interface Game {
    gameId: string;
    stake:number;
    numberMines:number;
    userClick:number;
    playing:boolean;
    matrix: Col[][];
    completed:boolean;
}
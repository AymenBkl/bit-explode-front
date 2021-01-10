import { Col } from "./col";

export interface Game {
    _id: string;
    stake:number;
    numberMines:number;
    userClick:number;
    playing:boolean;
    completed:boolean;
    matrix:Col[][];
}
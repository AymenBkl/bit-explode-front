import { Col } from "./col";
import { EncryptedData } from './encryptedData';
export interface Game {
    _id: string;
    stake:number;
    numberMines:number;
    userClick:number;
    playing:boolean;
    completed:boolean;
    matrix:Col[][];
    data: EncryptedData; 
    status: string;
    type:string;
}
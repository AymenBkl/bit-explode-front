import { Col } from "./col";
import { Game } from "./game";

export interface CheckGameResponse {
    status: number;
    msg: string;
    success: boolean; 
    game : {game: Game, activeIndex : [{col:Col,indexRow: number, indexCol: number }]}
}
import { Col } from "./col";
import { Game } from "./game";

export interface GameResponse{
    status: number;
    msg: string;
    success: boolean;
    game: Game;
}
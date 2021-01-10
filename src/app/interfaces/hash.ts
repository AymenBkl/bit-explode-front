import { Game } from "./game";

export interface Hash {
    _id: string;
    hashId: string;
    games: Game[];
}
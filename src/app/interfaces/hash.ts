import { Address } from "./address";
import { Game } from "./game";

export interface Hash {
    _id: string;
    hashId: string;
    games: Game[];
    passwordChange: boolean;
    address: Address;
}
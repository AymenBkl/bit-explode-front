import { Hash } from "crypto";
import { Game } from "./game";

export interface HashResponse{
    status: number;
    msg: string;
    success: boolean;
    hash: Hash;
}
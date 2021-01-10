import { Hash } from "./hash";

export interface HashResponse{
    status: number;
    msg: string;
    success: boolean;
    hash: Hash;
}
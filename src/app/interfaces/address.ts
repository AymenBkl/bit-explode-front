import { Deposit } from "./deposit";

export interface Address {
    _id: string;
    address: string;
    createdAt: string;
    hashId:string;
    deposits: Deposit[];
}
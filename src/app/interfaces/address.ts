import { Deposit } from "./deposit";

export interface Address {
    address: string;
    createdAt: string;
    hashId:string;
    deposits: Deposit[];
}
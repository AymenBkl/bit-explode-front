import { Deposit } from "./deposits";

export interface DepositResponse {
    status: number;
    msg: string;
    success: boolean;
    deposits: Deposit[];
}
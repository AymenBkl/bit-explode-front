export interface Deposit {
    _id: string;
    addressId: string;
    amount: number;
    currentBalance: number;
    txid:string;
    active:string;
}
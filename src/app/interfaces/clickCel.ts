import { EncryptedData } from "./encryptedData";

export interface ClickCel { 
    userClick: number, 
    indexMines: [{ indexRow: number, indexCol: number }];
    color: string;
    data:EncryptedData;
} 
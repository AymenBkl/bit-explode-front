import { Hash } from './hash';
export interface AuthResponse {
    err: string;
    success: boolean;
    token: string;
    msg: string;
    status: number;
    hash: Hash;
}

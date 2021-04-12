import { Complaint } from "./complaint";

export interface ComplaintResponse {
    status: number;
    msg: string;
    success: boolean;
    complaints: Complaint[];
    token: string;
}
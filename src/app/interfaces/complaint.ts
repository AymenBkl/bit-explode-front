export interface Complaint {
    hashId:string;
    createdAt:string;
    type:string;
    description:string;
    status:string;
    response: {
        note:string;
        status:string;
    }
}
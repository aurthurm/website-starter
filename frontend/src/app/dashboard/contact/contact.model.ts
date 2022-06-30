
export interface IContact {
    _id?: string;    
    firstName: string,
    lastName: string,
    email: string,
    subject: string,
    message: string,
    opened?: boolean;
    dateOpened?: string;
    createdAt?: string;
}
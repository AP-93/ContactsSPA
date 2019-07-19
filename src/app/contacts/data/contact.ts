export interface IContact {
    id: number;
    firstName: string;
    lastName: string;
    emails: IEmail[];
    phoneNumbers: IPhoneNum[];
}
export interface IEmail {
    id: number;
    email: string;
    contactID: number;
}
export interface IPhoneNum {
    id: number;
    phoneNum: string;
    contactID: number;
}
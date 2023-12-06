import { IUser } from "../models";
export class AddUser {
    static readonly type = '[User] Add';
    constructor(public AddUser: IUser) { }
}
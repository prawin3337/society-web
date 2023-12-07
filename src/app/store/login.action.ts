import { ILogin } from "../models";

//Read
export class GetLogin {
    static readonly type = '[Login] Fetch';
    constructor(public payload: ILogin) { }
}

// //Create
// export class AddUsers {
//     static readonly type = '[Users] Add';
//     constructor(public payload: any) { }
// }

// //Update
// export class UpdateUsers {
//     static readonly type = '[Users] Update';
//     constructor(public payload: any, public id: number, public i: number) { }
// }

// //Delete
// export class DeleteUsers {
//     static readonly type = '[Users] Delete';
//     constructor(public id: number) { }
// }

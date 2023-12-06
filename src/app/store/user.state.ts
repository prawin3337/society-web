/*
* https://dev.to/siddheshthipse/beginner-s-guide-of-state-management-using-ngxs-35dn
*/

import { Injectable } from '@angular/core';
import { State, NgxsOnInit, Action, StateContext, Selector } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';

import { IUser } from "../models";

import {AddUser} from "./user.action";

@State<IUser>({
    name: 'user',
    defaults: {
        flatNumber: '',
        name: '',
        emailId: '',
        mobileNumber: 0
    }
})
@Injectable()
export class UserState {

    @Selector()
    static selectStateData(state: IUser) {
        return state;
    }

    @Action(AddUser)
    addUser(ctx: StateContext<IUser>) {
        const state = ctx.getState();
        ctx.setState({
            ...state
        });
    }
}

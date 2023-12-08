import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, tap } from 'rxjs/operators';

// import { DesignutilityService } from "../designutility.service";
// import { AddUsers, DeleteUsers, GetUsers, UpdateUsers } from "../actions/app.action";
import { GetLogin } from "./login.action";
import { LoginService } from "../services/login.service";
import { Observable, of } from "rxjs";
import { ToastController } from "@ionic/angular";

export class LoginStateModel {
    login: any
}

@State<LoginStateModel>({
    name: 'loginSate',
    defaults: {
        login: {}
    }
})

@Injectable()
export class LoginSate {
    constructor(private loginService: LoginService, private toastController: ToastController) { }

    @Selector()
    static selectStateData(state: LoginStateModel) {
        return state.login;
    }

    @Action(GetLogin)
    getDataFromState(ctx: StateContext<LoginStateModel>, { payload }: GetLogin) {
        return this.loginService.login(payload)
            .pipe(
                catchError(async (error: any, caught: Observable<any>): Promise<Observable<any>> => {
                    console.error('There was an error!', error);

                    const toast = await this.toastController.create({
                        message: `There was an error! ${error.statusText}.`,
                        duration: 1500,
                        position: 'top',
                    });
                    await toast.present();

                    // after handling error, return a new observable 
                    // that doesn't emit any values and completes
                    return of();
                }),
                tap(res => {
                    const state = ctx.getState();

                    ctx.setState({
                        ...state,
                        login: res //here the data coming from the API will get assigned to the users variable inside the appstate
                    })
                })
            )
    }

    // @Action(AddUsers)
    // addDataToState(ctx: StateContext<LoginStateModel>, { payload }: AddUsers) {
    //     return this._du.addUsers(payload).pipe(tap(returnData => {
    //         const state = ctx.getState();
    //         ctx.patchState({
    //             users: [...state.users, returnData]
    //         })
    //     }))
    // }

    // @Action(UpdateUsers)
    // updateDataOfState(ctx: StateContext<LoginStateModel>, { payload, id, i }: UpdateUsers) {
    //     return this._du.updateUser(payload, i).pipe(tap(returnData => {
    //         const state = ctx.getState();

    //         const userList = [...state.users];
    //         userList[i] = payload;

    //         ctx.setState({
    //             ...state,
    //             users: userList,
    //         });
    //     }))
    // }

    // @Action(DeleteUsers)
    // deleteDataFromState(ctx: StateContext<LoginStateModel>, { id }: DeleteUsers) {
    //     return this._du.deleteUser(id).pipe(tap(returnData => {
    //         const state = ctx.getState();
    //         console.log("The is is", id)
    //         //Here we will create a new Array called filteredArray which won't contain the given id and set it equal to state.todo
    //         const filteredArray = state.users.filter(contents => contents.id !== id);

    //         ctx.setState({
    //             ...state,
    //             users: filteredArray
    //         })
    //     }))
    // }
}
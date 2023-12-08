import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Select, Store } from '@ngxs/store';

import { ILogin } from "../../../models";

import { GetLogin } from "../../../store/login.action";
import { LoginSate } from "../../../store/login.state";
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent  implements OnInit {

  hide = true;
  loginData = {}

  @Select(LoginSate.selectStateData) loginData$: Observable<ILogin> | undefined;

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService) { }

  async ngOnInit() {
    this.authService.verifyAuthToken()
      .then((isValid: boolean) => {
        console.log(isValid);
        isValid && this.router.navigateByUrl('society');
      });

    this.loginData$?.subscribe(async (res: any) => {
      if (res && res.tokan) {
        localStorage.setItem("auth-token", res.tokan);
        this.router.navigateByUrl('society');
      }
    });
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(new GetLogin(form.value));
  }
}

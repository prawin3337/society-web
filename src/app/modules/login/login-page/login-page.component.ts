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
    const authToken = localStorage.getItem("auth-token") || '';
    this.authService.verifyAuthToken(authToken)
        .pipe(
          catchError(this.handleError)
        )
        .subscribe((res: any) => {
          if (res.success) {
            this.router.navigateByUrl('society');
          }
        })

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

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      // console.error(
      //   `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}

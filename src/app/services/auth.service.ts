import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { TokenService, TokenEnum } from './token.service';
import { ILogin } from '../models';
import { LoadingService } from './loading.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private loadingService: LoadingService,
    private router: Router) { }

  login(params: ILogin) {
    return this.http.post(environment.apis.login, params);
  }

  async verifyAuthToken() {
    this.loadingService.showLoading();
    return new Promise<boolean>(async (resolve) => {
      const authToken = this.tokenService.getToken(TokenEnum.AuthToke);
      if (authToken) {
        let headers = new HttpHeaders({ "Authorization": authToken });
        await this.http.post(environment.apis.auth, {}, { headers })
            .pipe(catchError((error: HttpErrorResponse) => {
              resolve(false);
              return this.handleError(error);
            }))
            .subscribe(async (res: any) => {
              await this.loadingService.hideLoading();
              resolve(res.success);
            });
      } else {
        await this.loadingService.hideLoading();
        resolve(false);
      }
    });
  }

  private async handleError(error: HttpErrorResponse) {
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
    await this.loadingService.hideLoading();
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  logout() {
    this.tokenService.deleteToken(TokenEnum.AuthToke);
    this.router.navigateByUrl("login");
  }
}

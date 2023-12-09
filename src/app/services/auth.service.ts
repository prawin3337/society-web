import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService) { }

  async verifyAuthToken() {
    return new Promise<boolean>(async (resolve) => {
      const authToken = this.tokenService.getToken("auth-token");
      if (authToken) {
        let headers = new HttpHeaders({ "Authorization": authToken });
        await this.http.post(environment.apis.auth, {}, { headers })
            .pipe(catchError((error: HttpErrorResponse) => {
              resolve(false);
              return this.handleError(error);
            }))
            .subscribe((res: any) => {
              resolve(res.success)
            });
      } else {
        resolve(false);
      }
    });
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

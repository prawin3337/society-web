import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService, TokenEnum } from "../services/token.service";
import { Router } from "@angular/router";
import { tap } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService,
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        const authToken = this.tokenService.getToken(TokenEnum.AuthToke);
        const isValidToken = this.tokenService.tokenAvailable(TokenEnum.AuthToke);

        if (isValidToken) {
            req = req.clone({
                headers: req.headers.set('authorization', authToken)
            });
        }

        return next.handle(req).pipe(tap(() => { },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        return;
                    }
                    this.router.navigate(['login']);
                }
            }));
    }
}
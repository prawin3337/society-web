import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export enum TokenEnum {
  AuthToke = "auth-token"
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  addToken(key: string, value: string) {
    const myDate: Date = new Date();
    myDate.setMinutes(myDate.getMinutes() + 15);
    this.cookieService.set(key, value, { expires: myDate });
  }

  getToken(key: string): string {
    return this.cookieService.get(key);
  }

  deleteToken(key: string) {
    // this.cookieService.deleteAll();
    this.cookieService.set(key, "", { expires: new Date().getSeconds()+1 });
  }

  tokenAvailable(key: string) {
    return this.cookieService.check(key);
  }
}

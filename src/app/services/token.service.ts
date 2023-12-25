import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export enum TokenEnum {
  AuthToke = "auth-token",
  userInfo = "user-info"
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

  deleteToken(key: string | string[]) {
    // this.cookieService.deleteAll();
    if(key instanceof Array) {
      key.forEach((ky) => {
        this.cookieService.set(ky, "", { expires: new Date().getSeconds() + 1 });
      });
    } else {
      this.cookieService.set(key, "", { expires: new Date().getSeconds() + 1 });
    }
  }

  tokenAvailable(key: string) {
    return this.cookieService.check(key);
  }
}

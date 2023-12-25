import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenEnum, TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  members: any = [];

  constructor(private http: HttpClient,
    private tokenService: TokenService) { }

  getMemberIds(): Observable<any> {
    return this.http.get(environment.apis.members);
  }

  getUserInfo() {
    const userInfo = this.tokenService.getToken(TokenEnum.userInfo);
    return userInfo ? JSON.parse(userInfo) : {};
  }
}

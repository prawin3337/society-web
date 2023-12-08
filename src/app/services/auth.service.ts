import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  verifyAuthToken(token: string) {
    console.log(token);
    let headers = new HttpHeaders({ "auth-token": token });
    let options = { headers: headers };
    return this.http.post("/api/auth", {}, options);
  }
}

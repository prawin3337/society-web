import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ILogin } from "../models";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(params: ILogin) {
    return this.http.post("/api/login", params);
  }
}

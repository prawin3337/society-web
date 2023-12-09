import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  addToken(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getToken(key: string): string {
    return localStorage.getItem(key) || '';
  }

  deleteToken(key: string) {
    localStorage.removeItem(key);
  }
}

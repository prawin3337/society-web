import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlatService {

  constructor(private http: HttpClient) { }

  getFlatNos() {
    return this.http.get(environment.apis.flatNos);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IPettyCash {
  id: number,
  flatNo: number,
  date: Date,
  transactionDate: Date,
  debitAmount: number,
  creditAmount: number,
  transactionRef: string|number,
  description: string,
  userId: string
}

export type summary = { totalCreditAmount: number, totalDebitAmount: number, balanceAmount: number };

@Injectable({
  providedIn: 'root'
})
export class PettyCashService {

  constructor(private http: HttpClient) { }

  addPettyCash(params: IPettyCash): Observable<IPettyCash> {
    return this.http.post<IPettyCash>(environment.apis.pettyCash, params);
  }

  getPettyCashSummary(): Observable<summary> {
    return this.http.get<summary>(environment.apis.pettyCashSummary)
      .pipe(
        map((res: any) => {
          return res.data;
        }),
        catchError((err: any) => {
          console.log(err);
          return of({} as summary);
        })
    );
  }
}

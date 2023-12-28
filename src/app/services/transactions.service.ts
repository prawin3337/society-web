import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  transactions: Observable<any[]>;

  constructor(private http: HttpClient) {
    this.transactions = new Observable();
  }

  getTransactions(flatNo: string) {
    return this.http.get(environment.apis.transactionAll, {params: {flatNo}});
  }
}

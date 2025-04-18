import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { formatDate } from '../util';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  transactions: Subject<any> = new Subject();

  constructor(private http: HttpClient, private toastController: ToastController) {}

  getTransactions(flatNo: string|null = null, financYear: string|null = null) {
    let params = {};
    let eventType = "fetchAll";
    
    if (flatNo && financYear) {
      const finYear = financYear.split("-");
      const fromDate = `${finYear[0]}-04-1 00:00:00`;
      const toDate = `${finYear[1]}-03-28 23:59:00`;
      params = {
        flatNo,
        financYear: JSON.stringify({ fromDate, toDate })
      }
      eventType = "fetch";
    }
    
    this.http.get(environment.apis.transactionAll, { params })
      .subscribe((res:any) => {
        const data = res.data.map((obj:any) => {
          obj.transactionType = obj.type;
          obj.transactionDate = new Date(obj.transactionDate);
          return obj;
        });
        if (res.success) {
          this.transactions.next({
            type: eventType,
            payload: res.data
          });
        }
      });

    return this.transactions;
  }

  updateTransaction(payload: FormData) {
    return this.http.post(environment.apis.transaction, payload)
      .pipe(tap(async(res:any) => {
        let message = "Something went wrong. please try again.";

        if (res.success) {
          message = "Transaction updated.";
        }

        const toast = await this.toastController.create({
          message: message,
          duration: 1500,
          position: 'top',
        });
        await toast.present();
      }));
  }

  deleteTransaction(transactionId: number) {
    return this.http.delete(environment.apis.transaction, {body:{ id: transactionId }});
  }

  approveTransaction(id: number, isApproved: string, flatNo: string) {
    return this.http.post(environment.apis.transactionApprove, { id, isApproved, flatNo });
  }

  getTransactionOvervew() {
    return this.http.get(environment.apis.transactionOverview)
      .pipe(map((res: any) => {
        res.data.recentTransactionDate = formatDate(res.data.recentTransactionDate);
        return res.data;
      }));
  }
}

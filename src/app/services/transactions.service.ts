import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';

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

  approveTransaction(id: number, isApproved: string, flatNo: string) {
    return this.http.post(environment.apis.transactionApprove, { id, isApproved, flatNo });
  }
}

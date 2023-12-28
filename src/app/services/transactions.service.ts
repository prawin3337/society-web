import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  transactions: Subject<any> = new Subject();

  constructor(private http: HttpClient, private toastController: ToastController) {
    
  }

  getTransactions(flatNo: string) {
    return this.http.get(environment.apis.transactionAll, {params: {flatNo}})
      .subscribe((res:any) => {
        if (res.success) {
          this.transactions.next({
            type: "fetch",
            payload: res.data
          });
        }
      });
  }

  updateTransaction(payload: FormData) {
    const flatNo = payload.get("flatNo");
    this.http.post(environment.apis.transaction, payload)
      .subscribe(async (res: any) => {
        let message = "Something went wrong. please try again.";

        if (res.success) {
          message = "Transaction updated.";
          this.getTransactions(flatNo as string);
        }

        const toast = await this.toastController.create({
          message: message,
          duration: 1500,
          position: 'top',
        });
        await toast.present();
      });
  }
}

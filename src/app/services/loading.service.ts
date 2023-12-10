import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading: any;

  constructor(private loadingCtrl: LoadingController) {}

  async showLoading() {
    this.loading = this.loadingCtrl.create({});
    (await this.loading).present();
  }

  async hideLoading() {
    (await this.loading).dismiss();;
  }
}

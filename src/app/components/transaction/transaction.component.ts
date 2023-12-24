import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent  implements OnInit {

  trasanctionForm: FormGroup = {} as FormGroup;
  billImage: any = {};

  transactionTypes = [
    { value: 'maintainance', viewValue: 'Maintainance' }
  ];

  constructor(private http: HttpClient) {
    defineCustomElements(window);
  }

  ngOnInit() {
    this.buildTransactionForm();
  }

  buildTransactionForm() {
    this.trasanctionForm = new FormGroup({
      amount: new FormControl(null, {validators: [Validators.required]}),
      desctription: new FormControl('', {}),
      transactionCode: new FormControl('', {validators: [Validators.required]}),
      transactionDate: new FormControl('', { validators: [Validators.required] }),
      transactionType: new FormControl('maintainance'),
      receiptNumber: new FormControl(''),
      photo: new FormControl(''),
      isCredit: new FormControl(1)
    })
  }

  async takePicture() {
    try {
      const image: Photo = await Camera.getPhoto({
        // quality: 90,
        // allowEditing: false,
        resultType: CameraResultType.DataUrl
      });

      if (image.dataUrl) {
        this.billImage = image;
        const base64Response = await fetch(image.dataUrl);
        const blob = await base64Response.blob();
        this.trasanctionForm.get('photo')?.setValue(blob);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async onSubmit() {
    const data = this.trasanctionForm.value;
    console.log("data", data);
    const payload = new FormData();
    for (let key in data) {
      if (key == 'photo') {
        await payload.append(key, data[key], `.${this.billImage.format}`);
      } else {
        await payload.append(key, data[key]);
      }
    }
    console.log(payload);
    this.http.post(environment.apis.transaction, payload)
      .subscribe(() => {
        this.billImage = {};
      });;
  }

}

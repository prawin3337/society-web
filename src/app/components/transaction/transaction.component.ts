import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { MemberService } from 'src/app/services/member.service';
import { environment } from 'src/environments/environment';
import { TransactionsService } from "../../services/transactions.service";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent  implements OnInit, OnDestroy {

  _filter: any;
  @Input() set filter(value: any) {
    this._filter = value;
  }

  trasanctionForm: FormGroup = {} as FormGroup;
  billImage: any = {};
  userInfo: any = {};
  showOptionalFields = false;

  transactionTypes = [
    { value: 'maintainance', viewValue: 'Maintainance' }
  ];

  members:any[] = [];

  constructor(private http: HttpClient,
    private memberService: MemberService,
    private transactionsService: TransactionsService) {
    defineCustomElements(window);
  }

  ngOnInit() {
    this.memberService.getMemberIds()
      .subscribe((res: any) => {
        if(res.success) {
          this.members = res.data;
        }
      });

    this.userInfo = this.memberService.getUserInfo();

    this.transactionsService.transactions
      .subscribe(async (event: any) => {
        this.trasanctionForm.reset();
        this.billImage = {};
        this.setDefaultValues();
      });

    this.buildTransactionForm();
  }

  buildTransactionForm() {
    this.trasanctionForm = new FormGroup({
      flatNo: new FormControl('', { validators: [Validators.required] }),
      amount: new FormControl(null, {validators: [Validators.required]}),
      description: new FormControl('', {}),
      transactionCode: new FormControl('', { validators: [Validators.required, Validators.minLength(5)]}),
      transactionDate: new FormControl('',
        { validators: [
          Validators.required,
          (control: AbstractControl): ValidationErrors | null => {
            const dateObj = control.value;
            if (!dateObj) return null;
            const dateRgex = new RegExp("^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$");
            const date = (dateObj.getMonth() + 1) + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();
            return date && date.match(dateRgex) ? null : {wrongDate: "Please enter valid date."} 
          }
        ]}),
      transactionType: new FormControl(''),
      receiptNumber: new FormControl(''),
      photo: new FormControl(''),
      isCredit: new FormControl()
    })

    this.setDefaultValues();
  }


  setDefaultValues() {
    this.trasanctionForm.get('flatNo')?.setValue(this._filter.flatNo);
    this.trasanctionForm.get('isCredit')?.setValue(1);
    this.trasanctionForm.get('transactionType')?.setValue('maintainance');
  }

  async takePicture() {
    try {
      const image: Photo = await Camera.getPhoto({
        // quality: 90,
        allowEditing: true,
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
    const payload = new FormData();
    for (let key in data) {
      if (key == 'photo' && data[key]) {
        await payload.append(key, data[key], `.${this.billImage.format}`);
      } else if (key == 'transactionDate') {
        const tDate = new Date(data[key]);
        const newDate = `${tDate.getFullYear()}-${tDate.getMonth() + 1}-${tDate.getDate()}`;
        payload.append(key, newDate);
      } else {
        await payload.append(key, data[key]);
      }
    }

    this.transactionsService.updateTransaction(payload);
  }

  onDestroy() {
    this.userInfo = {};
    this.billImage = {};
    this.trasanctionForm.reset();
  }

  ionViewDidLeave() {
    this.onDestroy();
  }

  ngOnDestroy() {
    this.onDestroy();
  }

}

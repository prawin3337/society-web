import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { MemberService } from 'src/app/services/member.service';
import { environment } from 'src/environments/environment';
import { TransactionsService } from "../../services/transactions.service";
import { debounce, debounceTime } from 'rxjs';

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

  transactionForm: FormGroup = {} as FormGroup;
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
        this.transactionForm.reset();
        this.billImage = {};
        this.setDefaultValues();
      });

    this.buildTransactionForm();

    if (this.userInfo.type === "admin") {
      this.showOptionalFields = true;
      this.transactionTypes.push({ value: 'expense', viewValue: 'Expense' });
    } else {
      const creditAmountCtrl = this.transactionForm.get("creditAmount");
      creditAmountCtrl?.addValidators(Validators.required);
      creditAmountCtrl?.updateValueAndValidity();

      this.transactionTypes = this.transactionTypes.filter((tType: any) => !["expense"].includes(tType.value));
    }
  }

  buildTransactionForm() {
    this.transactionForm = new FormGroup({
      flatNo: new FormControl('', { validators: [Validators.required] }),
      creditAmount: new FormControl(null),
      debitAmount: new FormControl(null),
      description: new FormControl('', {}),
      transactionCode: new FormControl('', { validators: [Validators.required, Validators.minLength(4)]}),
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
      transactionType: new FormControl('', {validators: [Validators.required]}),
      receiptNumber: new FormControl(''),
      photo: new FormControl(''),
      isCredit: new FormControl()
    })

    this.setDefaultValues();

    this.transactionForm.valueChanges
      .pipe(debounceTime(10))
      .subscribe(val => {
        if(val.creditAmount != null) {
          this.transactionForm.get("debitAmount")?.disable();
        } else {
          this.transactionForm.get("debitAmount")?.enable();
        }

        if (val.debitAmount != null) {
          this.transactionForm.get("creditAmount")?.disable();
        } else {
          this.transactionForm.get("creditAmount")?.enable();
        }
      });
  }


  setDefaultValues() {
    this.transactionForm.get('flatNo')?.setValue(this._filter.flatNo);
    this.transactionForm.get('isCredit')?.setValue(1);

    const transactionType = this.userInfo.type === "admin" ? "" : "maintainance"
    this.transactionForm.get('transactionType')?.setValue(transactionType);
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
        this.transactionForm.get('photo')?.setValue(blob);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async onSubmit() {
    const data = this.transactionForm.value;
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

    this.transactionsService.updateTransaction(payload)
      .subscribe(async (data: any) => {
        const { flatNo, financYear } = this._filter;
        this.transactionsService.getTransactions(flatNo, financYear);
      });
  }

  onDestroy() {
    this.userInfo = {};
    this.billImage = {};
    this.transactionForm.reset();
  }

  ionViewDidLeave() {
    this.onDestroy();
  }

  ngOnDestroy() {
    this.onDestroy();
  }

  disableSubmitBtn(): boolean {
    if(this.transactionForm.get("creditAmount")?.value == null
      && this.transactionForm.get("debitAmount")?.value == null) {
        return true;
      }

    return !this.transactionForm.valid;
  }

}

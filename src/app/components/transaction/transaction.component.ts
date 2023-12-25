import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { MemberService } from 'src/app/services/member.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent  implements OnInit, OnDestroy {

  trasanctionForm: FormGroup = {} as FormGroup;
  billImage: any = {};
  userInfo: any = {};
  showOptionalFields = false;

  transactionTypes = [
    { value: 'maintainance', viewValue: 'Maintainance' }
  ];

  members:any[] = [];

  constructor(private http: HttpClient,
    private memberService: MemberService) {
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
    this.buildTransactionForm();
  }

  buildTransactionForm() {
    this.trasanctionForm = new FormGroup({
      flatNo: new FormControl(this.userInfo?.flatNo, { validators: [Validators.required] }),
      amount: new FormControl(null, {validators: [Validators.required]}),
      desctription: new FormControl('', {}),
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
      } else {
        await payload.append(key, data[key]);
      }
    }

    this.http.post(environment.apis.transaction, payload)
      .subscribe(() => {
        this.billImage = {};
      });;
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

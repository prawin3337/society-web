import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IonImg } from "@ionic/angular/standalone";
import { PettyCashService } from 'src/app/services/petty-cash.service';

@Component({
  selector: 'app-petty-cash-form',
  templateUrl: './petty-cash-form.component.html',
  styleUrls: ['./petty-cash-form.component.scss'],
  imports: [
    IonImg, FormsModule, MatFormFieldModule, MatDatepickerModule, ReactiveFormsModule,
    UpperCasePipe, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule
  ],
  standalone: true
})
export class PettyCashFormComponent  implements OnInit {

  transactionForm: FormGroup = {} as FormGroup;

  constructor(private pettyCashService: PettyCashService) { }

  ngOnInit() {
    this.transactionForm = this.getTransactionForm();
  }

  getTransactionForm(): FormGroup {
    return new FormGroup({
      flatNo: new FormControl(0), // TODO: set from input
      creditAmount: new FormControl(null),
      debitAmount: new FormControl(null),
      transactionRef: new FormControl(null, {validators: [Validators.required]}),
      transactionDate: new FormControl('',
        {
          validators: [
            Validators.required,
            (control: AbstractControl): ValidationErrors | null => {
              const dateObj = control.value;
              if (!dateObj) return null;
              const dateRgex = new RegExp("^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$");
              const date = (dateObj.getMonth() + 1) + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();
              return date && date.match(dateRgex) ? null : { wrongDate: "Please enter valid date." }
            }
          ]
        }
      ),
      description: new FormControl('')
    })
  }

  onSubmit(): void {
    const transactionDate = new Date(this.transactionForm.value.transactionDate);

    const newDate = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}-${transactionDate.getDate()}`;
    this.transactionForm.value.transactionDate = newDate;
    const flatNo = this.transactionForm.value.flatNo;

    this.pettyCashService.addPettyCash(this.transactionForm.value)
      .subscribe(() => {
        this.transactionForm.reset();
        this.transactionForm.get('flatNo')?.setValue(0);
      });
  }

  disableSubmitBtn(): boolean {
    const creditAmount = this.transactionForm.get('creditAmount')?.value;
    const debitAmount = this.transactionForm.get('debitAmount')?.value;
    if (this.transactionForm.valid && (creditAmount || debitAmount)) {
      return false
    }
    return true;
  }

}

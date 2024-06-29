import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular'; // Angular Grid Logic
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { TransactionsService } from "../../services/transactions.service";
import { MemberService } from 'src/app/services/member.service';

import { formatDate, handleNullColumn } from "../../util";
import { AlertController, IonicModule, PopoverController } from '@ionic/angular';
import { MatButtonModule } from '@angular/material/button';

import { RowOptionsComponent } from "./row-options/row-options.component";
import { MaintainanceService } from 'src/app/services/maintainance.service';

@Component({
  selector: 'app-show-transactions',
  templateUrl: './show-transactions.component.html',
  styleUrls: ['./show-transactions.component.scss'],
  standalone: true,
  imports: [AgGridModule, IonicModule, MatButtonModule]
})
export class ShowTransactionsComponent  implements OnInit {

  private gridApi!: GridApi<any>;

  _filter: any;
  @Input() set filter(value: any) {
    const { flatNo, financYear } = value;
    this._filter = value;
    this.transactionsService.getTransactions(flatNo, financYear);
  }

  @Output() transactionDet = new EventEmitter();
  @Output() onTransactionSelect = new EventEmitter();

  transactions = [];
  tableCol: ColDef[] = [];
  defaultColDef = {
    resizable: false
  }
  rowClassRules = {
    // apply green to 2008
    'approved-trancation': (params: any) => { return params.data.isApproved === "y" },

    // apply red to 2000
    'rejected-trancation': (params: any) => { return params.data.isApproved === "n" }
  };
  tranValidationPopover: any;

  constructor(private transactionsService: TransactionsService,
    private memberService: MemberService,
    private popoverController: PopoverController,
    private alertController: AlertController,
    private maintenanceService: MaintainanceService) {
    this.tableCol = [
      { field: "id", width: 50 },
      { field: "creditAmount", width: 100 },
      {
        field: "transactionDate",
        headerName: "Trans Date",
        width: 100,
        cellRenderer: (params: any) => {
          // put the value in bold
          return formatDate(params.value)
        }
      },
      {
        field: "transactionCode",
        headerName: "Trans Code/Ref",
        cellRenderer: (params: any) => handleNullColumn(params.value)
      },
      {
        field: "receiptNumber",
        cellRenderer: (params: any) => handleNullColumn(params.value)
      },
      {
        field: "description",
        cellRenderer: (params: any) => handleNullColumn(params.value)
      }
      // { 
      //   field: "date",
      //   headerName: "Rec Date",
      //   cellRenderer: (params:any) => {
      //     // put the value in bold
      //     return formatDate(params.value)
      //   }
      // }
      // { field: "photo" },
      // { field: "userId" },
      // { field: "type" },
      // { field: "flatNo" }
    ]
  }

  ngOnInit() {
    this.transactionsService.transactions
      .subscribe((event: any) => {
        if(event.type == "fetch") {
          this.transactions = event.payload;
          this.transactionDet.emit({
            payload: {
              credit: this.getCreditTransactionDet(this.transactions),
              debit: this.getDebitTransactionDet(this.transactions)
            }
          });
        }
      });

    const { type } = this.memberService.getUserInfo();
    if (type == "admin") {
      this.tableCol.push({ field: "debitAmount", width: 100 });
    }
  }

  private getCreditTransactionDet(data: any[]) {
    let creditAmt = 0;
    let approvedAmt = 0;

    data.forEach((transaction) => {
      creditAmt += Number(transaction.creditAmount);
      approvedAmt = (transaction.isApproved == "y") ? (approvedAmt + Number(transaction.creditAmount)) : approvedAmt;
    });

    return ({ totalAmt: creditAmt, approvedAmt });
  }

  private getDebitTransactionDet(data: any[]) {
    let debitAmt = 0;
    let approvedAmt = 0;

    data.forEach((transaction) => {
      debitAmt += Number(transaction.debitAmount);
      approvedAmt = (transaction.isApproved == "y") ? (approvedAmt + Number(transaction.debitAmount)) : approvedAmt;
    });

    return ({ totalAmt: debitAmt, approvedAmt });
  }

  async onSelectionChanged($event: any) {
    const { type: userType } = this.memberService.getUserInfo();
    if (userType !== "admin") return;

    const selectedData = $event.api.getSelectedRows();
    if (selectedData.length <= 0 || !selectedData[0]) return;
    if (selectedData[0].isApproved == 'y' || selectedData[0].isApproved == 'n') return;

    await this.presentPopover(selectedData);
  }

  async presentPopover(event: Event) {
    this.tranValidationPopover = await this.popoverController.create({
      component: RowOptionsComponent,
      componentProps: {
        parentRef: this,
        data: event
      }
    });
    return await this.tranValidationPopover.present();
  }

  async onApproveTransaction($event:any) {
    await this.tranValidationPopover.dismiss();

    const { type: userType } = this.memberService.getUserInfo();
    if (userType != "admin") return;

    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader: '',
      message: 'Approve transaction?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.approveTransaction($event.id, 'y', this._filter.flatNo);
          },
        }
      ],
    });
    await alert.present();
  }

  onUpdateTransaction($event: any) {
    if($event.isApproved === "y") return;

    this.onTransactionSelect.emit({
      action: "update",
      payload: $event
    })
  }

  async onDeleteTransaction($event: any) {
    if ($event.isApproved === "y") return;

    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader: '',
      message: 'Delete transaction?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.transactionsService.deleteTransaction($event.id)
              .subscribe((res) => {
                const { flatNo, financYear } = this._filter;
                this.transactionsService.getTransactions(flatNo, financYear);
              })
          },
        }
      ],
    });
    await alert.present();
  }

  async onRejectTransaction($event: any) {
    await this.tranValidationPopover.dismiss();

    const { type: userType } = this.memberService.getUserInfo();
    if (userType != "admin") return;

    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader: '',
      message: 'Reject transaction?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.approveTransaction($event.id, 'n', this._filter.flatNo);
          },
        }
      ],
    });
    await alert.present();
  }

  private approveTransaction(id: number, isApproved: string, flatNo: string) {
    this.transactionsService.approveTransaction(id, isApproved, flatNo).subscribe(() => {
      this.transactionsService.getTransactions(flatNo, this._filter.financYear);
      this.maintenanceService.fetchMaintenance(flatNo, this._filter.financYear);
    });
  }

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
  }

  onBtExport() {
    const { flatNo, financYear } = this._filter;
    const params = {
      fileName: `Flat_No-${flatNo}-${financYear}-transactions.csv`
    };
    this.gridApi.exportDataAsCsv(params);
  }

}

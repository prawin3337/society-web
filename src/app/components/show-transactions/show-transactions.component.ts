import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular'; // Angular Grid Logic
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { TransactionsService } from "../../services/transactions.service";
import { MemberService } from 'src/app/services/member.service';

import { formatDate } from "../../util";
import { AlertController, IonicModule, PopoverController } from '@ionic/angular';

import { RowOptionsComponent } from "./row-options/row-options.component";

@Component({
  selector: 'app-show-transactions',
  templateUrl: './show-transactions.component.html',
  styleUrls: ['./show-transactions.component.scss'],
  standalone: true,
  imports: [AgGridModule, IonicModule]
})
export class ShowTransactionsComponent  implements OnInit {

  _filter: any;
  @Input() set filter(value: any) {
    const { flatNo, financYear } = value;
    this._filter = value;
    this.transactionsService.getTransactions(flatNo, financYear);
  }

  tableCol: ColDef[] = [];
  transactions = [];
  defaultColDef = {
    resizable: false
  }
  rowClassRules = {
    // apply green to 2008
    'approved-trancation': (params: any) => { return params.data.isAppoved === "y" },

    // apply red to 2000
    'rejected-trancation': (params: any) => { return params.data.isAppoved === "n" }
  };
  tranValidationPopover: any;

  constructor(private transactionsService: TransactionsService,
    private memberService: MemberService,
    private popoverController: PopoverController,
    private alertController: AlertController) {
    this.tableCol = [
      { field: "amount", width: 100 },
      {
        field: "transactionDate",
        headerName: "Trans Date",
        width: 100,
        cellRenderer: (params: any) => {
          // put the value in bold
          return formatDate(params.value)
        }
      },
      { field: "transactionCode", headerName: "Trans Code/Ref" },
      { field: "receiptNumber" },
      { field: "description" },
      { 
        field: "date",
        headerName: "Rec Date",
        cellRenderer: (params:any) => {
          // put the value in bold
          return formatDate(params.value)
        }
      }
      // { field: "photo" },
      // { field: "userId" },
      // { field: "type" },
      // { field: "flatNo" }
    ]
  }

  ngOnInit() {
    this.transactionsService.transactions
      .subscribe((event: any) => {
        this.transactions = event.payload;
      });

    // const { flatNo } = this.memberService.getUserInfo();
    // this.transactionsService.getTransactions(flatNo);
  }

  async onSelectionChanged($event: any) {
    const { type: userType } = this.memberService.getUserInfo();
    if (userType !== "admin") return;

    const selectedData = $event.api.getSelectedRows();
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
    this.tranValidationPopover.dismiss();

    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader: '',
      message: 'Approve transaction?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Alert confirmed');
          },
        }
      ],
    });
    await alert.present();
  }

  onRejectTransaction($event: any) {
    this.tranValidationPopover.dismiss();
  }

  onGridReady(params: GridReadyEvent<any>) {

  }

}

import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { TransactionsService } from 'src/app/services/transactions.service';
import { PettyCashService, summary } from 'src/app/services/petty-cash.service';

@Component({
  selector: 'app-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.scss'],
  standalone: true,
  imports: [MatGridListModule, MatCardModule]
})
export class TransactionOverviewComponent  implements OnInit {

  pettyCashSummary!:summary;

  transactionOvervew = {
    "approvedCreditAmt": 0,
    "nonApprovedCreditAmt": 0,
    "approvedDebitAmt": 0,
    "nonApprovedDebitAmt": 0,
    "currentBalanceAmt": 0,
    "postApprovelBalanceAmt": 0,
    "recentTransactionDate": new Date()
  };

  constructor(private transactionService: TransactionsService,
    private pettyCashService: PettyCashService
  ) {
    this.pettyCashSummary = {
      balanceAmount: 0,
      totalCreditAmount: 0,
      totalDebitAmount: 0
    }
  }

  ngOnInit() {
    this.transactionService.getTransactionOvervew()
      .subscribe((data: any) => {
        this.transactionOvervew = data;
      });
    this.getPettyCashSummary();
  }

  getPettyCashSummary() {
    this.pettyCashService.getPettyCashSummary()
      .subscribe((data: summary) => {
        this.pettyCashSummary = data;
      });
  }

  getBankBal(): number|string {
    return (this.pettyCashSummary && this.transactionOvervew.currentBalanceAmt)
      ? (this.transactionOvervew.currentBalanceAmt - this.pettyCashSummary.balanceAmount).toLocaleString()
      : 'NA';
  }

}

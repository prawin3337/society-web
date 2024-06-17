import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.scss'],
  standalone: true,
  imports: [MatGridListModule, MatCardModule]
})
export class TransactionOverviewComponent  implements OnInit {

  transactionOvervew = {
    "approvedCreditAmt": 0,
    "nonApprovedCreditAmt": 0,
    "approvedDebitAmt": 0,
    "nonApprovedDebitAmt": 0,
    "currentBalanceAmt": 0,
    "postApprovelBalanceAmt": 0,
    "recentTransactionDate": new Date()
  };

  constructor(private transactionService: TransactionsService) { }

  ngOnInit() {
    this.transactionService.getTransactionOvervew()
      .subscribe((data: any) => {
        this.transactionOvervew = data;
      });
  }

}

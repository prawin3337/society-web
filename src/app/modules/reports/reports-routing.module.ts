import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';
import { MaintainanceReportComponent } from './maintainance-report/maintainance-report.component';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: 'maintaince-report',
        component: MaintainanceReportComponent
      },
      {
        path: 'transaction-report',
        component: TransactionReportComponent
      },
      {
        path: '',
        redirectTo: 'maintaince-report',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }

import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardPage } from './dashboard.page';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

// import { } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NgChartsModule } from 'ng2-charts';

import { MaintainancePieChart } from "./charts/maintainance.pie.chart";
import { TransactionDebitPieChart } from "./charts/transaction.debit.pie.chart";
import { TransactionOverviewComponent } from '../transaction-overview/transaction-overview.component';
import { MatDivider, MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    DashboardPageRoutingModule,
    NgChartsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    TransactionOverviewComponent,
    MatDividerModule
  ],
  declarations: [
    DashboardPage,
    MaintainancePieChart,
    TransactionDebitPieChart
  ]
})
export class DashboardPageModule {}

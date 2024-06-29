import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDashboardPage } from './user-dashboard.page';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonComponentModule } from 'src/app/components/common-component.module';

import { ShowTransactionsComponent } from "../../components/show-transactions/show-transactions.component";
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { AuthDirective } from 'src/app/directives/auth.directive';

import { MaintainanceModule } from "../../components/maintainance/maintainance.module";
import { PettyCashFormComponent } from '../petty-cash/petty-cash-form/petty-cash-form.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    UserDashboardRoutingModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    CommonComponentModule,
    ShowTransactionsComponent,
    AuthDirective,
    MaintainanceModule,
    PettyCashFormComponent
  ],
  declarations: [UserDashboardPage]
})
export class UserDashboardModule {}

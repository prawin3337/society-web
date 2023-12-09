import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDashboardPage } from './user-dashboard.page';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatGridListModule,
    UserDashboardRoutingModule,
    IonicModule
  ],
  declarations: [UserDashboardPage]
})
export class UserDashboardModule {}

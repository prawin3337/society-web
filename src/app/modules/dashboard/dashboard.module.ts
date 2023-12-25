import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardPage } from './dashboard.page';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

import { HeaderComponent } from "../../components/header/header.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    DashboardPageRoutingModule,
    HeaderComponent
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}

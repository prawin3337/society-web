import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDashboardPage } from './user-dashboard.page';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonComponentModule } from 'src/app/components/common-component.module';
import { HeaderComponent } from "../../components/header/header.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatGridListModule,
    UserDashboardRoutingModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    CommonComponentModule,
    HeaderComponent
  ],
  declarations: [UserDashboardPage]
})
export class UserDashboardModule {}

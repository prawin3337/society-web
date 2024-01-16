import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { MatButtonModule } from '@angular/material/button';

import { ShowMaintainanceComponent } from "./show-maintainance/show-maintainance.component";


@NgModule({
  declarations: [
    ShowMaintainanceComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    MatButtonModule
  ],
  exports: [
    ShowMaintainanceComponent
  ]
})
export class MaintainanceModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CommonHeaderComponent } from './common-header/common-header.component';

@NgModule({
  declarations: [CommonHeaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CommonHeaderComponent]
})
export class CommonComponentModule { }

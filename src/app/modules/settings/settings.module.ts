import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { IonicModule } from '@ionic/angular';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    IonicModule
  ]
})
export class SettingsModule { }

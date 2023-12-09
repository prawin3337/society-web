import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './landing-routing.module';

import { CommonComponentModule } from "../../components/common-component.module";

import { LandingPage } from './landing.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    CommonComponentModule
  ],
  declarations: [LandingPage]
})
export class LandingPageModule {}

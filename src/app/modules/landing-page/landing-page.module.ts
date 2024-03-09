import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './landing-routing.module';

import { CommonComponentModule } from "../../components/common-component.module";

import { LandingPage } from './landing.page';
import { AuthDirective } from 'src/app/directives/auth.directive';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    CommonComponentModule,
    AuthDirective,
    HeaderComponent
  ],
  declarations: [LandingPage]
})
export class LandingPageModule {}

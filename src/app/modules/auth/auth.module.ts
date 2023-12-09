import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { TokenService } from 'src/app/services/token.service';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    IonicModule,
    MatButtonModule
  ],
  providers: [
    TokenService
  ]
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { NgxsModule } from '@ngxs/store'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';

import { UserState } from "./store/user.state";
import { LoginSate } from './store/login.state'

import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    NgxsModule.forRoot([UserState, LoginSate]),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy},
    LoginService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

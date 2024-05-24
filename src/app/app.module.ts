import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { NgxsModule } from '@ngxs/store'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthService } from "./services/auth.service";
import { AuthInterceptor } from "./http-interceptors/auth-interceptor";

import { UserState } from "./store/user.state";
import { LoginSate } from './store/login.state'
import { CommonComponentModule } from './components/common-component.module';

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        IonicModule.forRoot(),
        BrowserAnimationsModule,
        NgxsModule.forRoot([UserState, LoginSate]),
        AppRoutingModule,
        CommonComponentModule], providers: [{
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        },
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}

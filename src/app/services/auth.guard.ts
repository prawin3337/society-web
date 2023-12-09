import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService, TokenEnum } from './token.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad, CanMatch {
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService:TokenService,
    private alertController: AlertController) {}
  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Session expired...',
      subHeader: 'Redirecting to login page.',
      message: 'Please relogin to continue.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((res) => {
      this.authService.verifyAuthToken()
        .then(async (isValid: boolean) => {
          if(!isValid){
            this.tokenService.deleteToken(TokenEnum.AuthToke);
            await this.presentAlert();
            this.router.navigateByUrl('login');
          }
          res(isValid);
        });
    });
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((res) => {
      this.authService.verifyAuthToken()
        .then(async (isValid: boolean) => {
          if (!isValid) {
            this.tokenService.deleteToken(TokenEnum.AuthToke);
            await this.presentAlert();
            this.router.navigateByUrl('login');
          }
          res(isValid);
        });
    });
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}

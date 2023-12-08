import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  {
    path: 'society',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    redirectTo: "society",
    pathMatch: "full"
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes) // { preloadingStrategy: PreloadAllModules }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

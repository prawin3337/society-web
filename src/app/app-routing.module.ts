import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'society',
    loadChildren: () => import('./modules/landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
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

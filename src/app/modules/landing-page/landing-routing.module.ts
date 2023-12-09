import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate, mapToCanActivateChild } from '@angular/router';
import { LandingPage } from './landing.page';
import { AuthGuard } from 'src/app/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingPage,
    canActivate: mapToCanActivate([AuthGuard]),
    canActivateChild: mapToCanActivateChild([AuthGuard]),
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'user-dashboard',
        loadChildren: () => import('../user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: '',
        redirectTo: '/society/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/society/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

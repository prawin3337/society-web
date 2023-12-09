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
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
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

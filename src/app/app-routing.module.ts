import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicGuard } from 'src/app/core/guards/public.guard';
import { PrivateGuard } from 'src/app/core/guards/private.guard';
import {OptInPreloadStrategy} from "./core/strategies/opt-in-preload-strategy";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [PublicGuard],
    canActivateChild: [PublicGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [PrivateGuard],
    canActivateChild: [PrivateGuard],
    data: { preload: true }
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: OptInPreloadStrategy })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

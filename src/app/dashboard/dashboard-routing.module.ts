import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'src/app/dashboard/home/home.component';
import { FullLayoutComponent } from 'src/app/layouts';
import {
  PROFILE_PATH
} from 'src/app/core/constants/paths';
import { AuthorizationGuard } from 'src/app/core/guards/authorization-guard';
import { DashboardGuard } from 'src/app/dashboard/dashboard.guard';

const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [DashboardGuard],
    children: [
      { path: '', component: HomeComponent },
      // {
      //   path: 'users',
      //   loadChildren: () => import('./user/user.module').then(m => m.UserModule),
      //   canActivate: [AuthorizationGuard],
      //   canActivateChild: [AuthorizationGuard],
      //   data: { permissions: GetUsers },
      // },
      {
        path: PROFILE_PATH,
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from 'src/app/dashboard/profile/profile.component';
import { ProfileFacade } from 'src/app/dashboard/profile/profile.facade';

const routes: Routes = [{ path: '', component: ProfileComponent }];

@NgModule({
  declarations: [ProfileComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [ProfileFacade],
})
export class ProfileModule {}

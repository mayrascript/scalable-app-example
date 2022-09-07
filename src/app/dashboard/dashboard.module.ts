import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from 'src/app/dashboard/dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { LayoutsModule } from 'src/app/layouts';
import { MENU_ITEMS } from 'src/app/dashboard/shared/constants/menu-items';
import {SharedModule} from "src/app/shared/shared.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [DashboardRoutingModule, LayoutsModule.forRoot(MENU_ITEMS), SharedModule],
})
export class DashboardModule {}

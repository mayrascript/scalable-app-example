import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { HeaderComponent } from './full-layout/header/header.component';
import { SidebarComponent } from './full-layout/sidebar/sidebar.component';
import { MenuComponent } from './full-layout/menu/menu.component';
import {
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective,
} from './menu-accordion';

import {
  MENU_ITEMS,
  MenuService,
} from 'src/app/layouts/full-layout/menu/menu.service';
import { Menu } from 'src/app/layouts/full-layout/menu/menu';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterComponent } from './full-layout/footer/footer.component';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

@NgModule({
  declarations: [
    SimpleLayoutComponent,
    FullLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    MenuComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    FooterComponent,
  ],
  exports: [SimpleLayoutComponent, FullLayoutComponent],
  imports: [RouterModule, MatSidenavModule,
    PerfectScrollbarModule,
    SharedModule],
})
export class LayoutsModule {
  static forRoot(menuItems: Menu[]): ModuleWithProviders<LayoutsModule> {
    return {
      ngModule: LayoutsModule,
      providers: [{ provide: MENU_ITEMS, useValue: menuItems }, MenuService],
    };
  }
}

export { FullLayoutComponent, SimpleLayoutComponent };

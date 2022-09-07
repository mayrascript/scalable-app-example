import { Inject, Injectable, InjectionToken } from '@angular/core';

import { Menu } from 'src/app/layouts/full-layout/menu/menu';

export const MENU_ITEMS = new InjectionToken<string>('List of menu items');

@Injectable()
export class MenuService {
  constructor(@Inject(MENU_ITEMS) private menuItems: Menu[]) {}

  getAll(): Menu[] {
    return this.menuItems;
  }

  add(menu: Menu) {
    this.menuItems = [...this.menuItems, menu];
  }
}

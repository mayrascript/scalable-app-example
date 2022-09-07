import { Component, ChangeDetectionStrategy } from '@angular/core';

import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  constructor(public menuService: MenuService) {}
}

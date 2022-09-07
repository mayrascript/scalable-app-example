import { UserRole } from 'src/app/core/enums/user-role.enum';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string | any[];
  name: string;
  type?: string;
  permissions?: UserRole[];
}

export interface Menu {
  state?: string | any[];
  name: string;
  type: 'link' | 'extLink' | 'extTabLink' | 'sub' | 'button';
  icon?: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
  permissions?: UserRole[];
}

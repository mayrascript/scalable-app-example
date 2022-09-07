import { Menu } from 'src/app/layouts/full-layout/menu/menu';
export const MENU_ITEMS: Menu[] = [
  // {
  //   state: 'users',
  //   name: 'Usuarios',
  //   type: 'sub',
  //   icon: 'group',
  //   permissions: GetUsers,
  //   children: [
  //     { state: 'users/pricing/new', name: 'Nuevo pricing' },
  //     { state: 'users/pricing', name: 'Pricing' },
  //     { state: 'users/load-generator', name: 'Generador de carga' },
  //   ],
  // },
  {
    state: '/dashboard/profile',
    name: 'Mi Perfíl',
    type: 'link',
    icon: 'person',
  },
];

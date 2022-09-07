import { NavigationEnd, Router } from '@angular/router';

import { filter, map } from 'rxjs/operators';

export function getNavigationEndEvent(router: Router) {
  return router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(event => event as NavigationEnd),
  );
}

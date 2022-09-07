import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/app/auth/auth.service';
import { AuthStorageService } from 'src/app/core/services/app/storage/auth-storage.service';
import { UserRole } from 'src/app/core/enums/user-role.enum';
import {
  DASHBOARD_URL
} from 'src/app/core/constants/paths';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private authStorageService: AuthStorageService,
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authStorageService.user;

    if (state.url !== DASHBOARD_URL) {
      return true;
    }

    // TODO: review this later
    switch (user?.role) {
      // case UserRole.admin:
      //   return this.router.createUrlTree([USERS_LOAD_GENERATOR_LIST_PATH]);
      // case UserRole.pricing:
      //   return this.router.createUrlTree([QUOTE_LIST_URL]);
      // case UserRole.loadGenerator:
      //   return this.router.createUrlTree([USER_CREATE_QUOTE_REQUEST_URL]);
      default:
        return true;
    }
  }
}

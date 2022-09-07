import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';

import { AuthStorageService } from 'src/app/core/services/app/storage/auth-storage.service';
import { UserRole } from 'src/app/core/enums/user-role.enum';
import { PRIVATE_FALLBACK_URL } from 'src/app/core/constants/global-tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate, CanActivateChild {
  constructor(
    private authStorageService: AuthStorageService,
    @Inject(PRIVATE_FALLBACK_URL) private privateFallbackUrl: string,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    if (state.url === '/') {
      return true;
    }

    const user = this.authStorageService.user;
    if (!user) {
      return this.router.createUrlTree([this.privateFallbackUrl]);
    }

    const permissions = this.getData('permissions', next);
    return (
      !!permissions?.some((role: UserRole) => role === user.role) ||
      this.router.createUrlTree([this.privateFallbackUrl])
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

  private getData(key: string, activatedRouteSnapshot: ActivatedRouteSnapshot) {
    return activatedRouteSnapshot.children.reduce(
      (data, next) => data || next.data[key] || next.children,
      activatedRouteSnapshot.data[key],
    );
  }
}

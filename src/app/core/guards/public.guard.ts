import { Inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
  Router,
} from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/app/auth/auth.service';
import { PRIVATE_FALLBACK_URL } from 'src/app/core/constants/global-tokens';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    @Inject(PRIVATE_FALLBACK_URL) private privateFallbackUrl: string,
    private router: Router,
  ) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> {
    return this.authService.isAuthorized().pipe(
      map(isAuthorized => {
        if (isAuthorized && !this.isPrivatePage(state)) {
          return this.router.createUrlTree([this.privateFallbackUrl]);
        }

        return true;
      }),
    );
  }

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> {
    return this.canActivate(route, state);
  }

  private isPrivatePage(state: RouterStateSnapshot): boolean {
    return state.url === this.privateFallbackUrl;
  }
}

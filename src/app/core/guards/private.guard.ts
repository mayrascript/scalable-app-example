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
import { PUBLIC_FALLBACK_URL } from 'src/app/core/constants/global-tokens';

@Injectable({
  providedIn: 'root',
})
export class PrivateGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    @Inject(PUBLIC_FALLBACK_URL) private publicFallbackUrl: string,
    private router: Router,
  ) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> {
    return this.authService.isAuthorized().pipe(
      map(isAuthorized => {
        if (!isAuthorized && !this.isPublicPage(state)) {
          return this.router.createUrlTree([this.publicFallbackUrl]);
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

  private isPublicPage(state: RouterStateSnapshot): boolean {
    return state.url === this.publicFallbackUrl;
  }
}

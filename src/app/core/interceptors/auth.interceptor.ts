import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/app/auth/auth.service';
import { PUBLIC_FALLBACK_URL } from 'src/app/core/constants/global-tokens';

const AUTHORIZATION_HEADER = 'Authorization';
const UNAUTHORIZED_ERROR_STATUS = 401;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    @Inject(PUBLIC_FALLBACK_URL) private publicFallbackUrl: string,
    private router: Router,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.getAccessToken().pipe(
      map(token => (!!token ? this.addAccessToken(token, request) : request)),
      switchMap(req => next.handle(req)),
      catchError((res: HttpErrorResponse) => this.responseError(res)),
    );
  }

  private addAccessToken(token: string, request: HttpRequest<unknown>) {
    return request.clone({ setHeaders: { [AUTHORIZATION_HEADER]: `Bearer ${token}` } });
  }

  private responseError(response: HttpErrorResponse) {
    if (response.status === UNAUTHORIZED_ERROR_STATUS) {
      this.authService.logout();
      this.router.navigate([PUBLIC_FALLBACK_URL]);
    }

    return throwError(response);
  }
}

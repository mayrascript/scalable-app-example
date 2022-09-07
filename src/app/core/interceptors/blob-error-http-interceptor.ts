import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BlobErrorHttpInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (
          err instanceof HttpErrorResponse &&
          err.error instanceof Blob &&
          ['application/problem+json', 'application/json'].includes(err.error.type)
        ) {
          // https://github.com/angular/angular/issues/19888
          // When request of type Blob, the error is also in Blob instead of object of the json data
          return new Promise<any>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e: Event) => {
              try {
                const error = JSON.parse((e.target as any).result);
                reject(
                  new HttpErrorResponse({
                    error,
                    headers: error.headers,
                    status: error.status,
                    statusText: error.statusText,
                    url: error.url,
                  }),
                );
              } catch (e) {
                reject(err);
              }
            };
            reader.onerror = () => {
              reject(err);
            };
            reader.readAsText(err.error);
          });
        }
        return throwError(err);
      }),
    );
  }
}

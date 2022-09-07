import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpEvent } from '@angular/common/http';

// import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { State } from 'src/app/store/reducers';
// import * as globalErrorActions from 'src/app/store/actions/global-error.actions';
import { isProblemDetailsError } from 'src/app/core/models/error/validation-error';
import { RequestOptions } from 'src/app/core/models/http/request-options';
import { Environment } from 'src/environments/environment';
import { ENVIRONMENT } from 'src/app/core/constants/global-tokens';

@Injectable()
export class ApiService {
  private host: string;

  constructor(
    @Inject(ENVIRONMENT) private environment: Environment,
    protected http: HttpClient,
    // private store: Store<State>,
  ) {
    this.host = environment.host;
  }

  public delete<T>(
    url: string,
    options?: RequestOptions & { observe?: 'response' },
    showValidationErrorMessage?: boolean,
  ): Observable<HttpResponse<T>>;

  public delete<T>(
    url: string,
    options?: RequestOptions & { observe?: 'body' },
    showValidationErrorMessage?: boolean,
  ): Observable<T>;

  public delete<T>(
    url: string,
    options?: RequestOptions & { observe?: 'response' | 'body' },
    showValidationErrorMessage = true,
  ): Observable<any> {
    return this.http
      .delete<T>(`${this.host}${url}`, options as any)
      .pipe(catchError(error => this.handleError(error, showValidationErrorMessage)));
  }

  public get<T>(url: string, option?: RequestOptions): Observable<T>;

  public get<T>(
    url: string,
    option?: RequestOptions & { observe: 'response' },
  ): Observable<HttpResponse<T>>;

  public get(
    url: string,
    option?: RequestOptions & { responseType: 'arraybuffer' },
  ): Observable<ArrayBuffer>;

  public get(url: string, option?: RequestOptions & { responseType: 'blob' }): Observable<Blob>;

  public get(
    url: string,
    option?: RequestOptions & { responseType: 'blob' } & { observe: 'response' },
  ): Observable<HttpResponse<Blob>>;

  public get<T>(
    url: string,
    option?: RequestOptions & { observe?: 'body' | 'events' | 'response' } & {
      responseType?: 'blob' | 'arraybuffer';
    },
  ): Observable<HttpResponse<T>> | Observable<T> | Observable<ArrayBuffer> | Observable<Blob> {
    return this.http
      .get(`${this.host}${url}`, option as any)
      .pipe(catchError(error => this.handleError(error)));
  }

  public patch<T>(
    url: string,
    body: any,
    options?: RequestOptions & { observe?: 'response' },
  ): Observable<HttpResponse<T>>;

  public patch<T>(
    url: string,
    body: any,
    options?: RequestOptions & { observe?: 'events' },
  ): Observable<HttpEvent<T>>;

  public patch<T>(
    url: string,
    body: any,
    options?: RequestOptions & { observe?: 'body' },
  ): Observable<T>;

  public patch<T>(
    url: string,
    body: any,
    options?: RequestOptions & { observe?: 'body' | 'events' | 'response' },
  ): Observable<HttpEvent<T>> | Observable<HttpResponse<T>> | Observable<T> {
    return this.http
      .patch<T>(`${this.host}${url}`, body, options as any)
      .pipe(catchError(error => this.handleError(error)));
  }

  public post<T>(
    url: string,
    body: any,
    options?: RequestOptions,
    showValidationErrorMessage?: boolean,
  ): Observable<T>;

  public post<T>(
    url: string,
    body: any,
    options?: RequestOptions & { responseType: 'blob' } & { observe: 'response' },
    showValidationErrorMessage?: boolean,
  ): Observable<HttpResponse<Blob>>;

  public post<T>(
    url: string,
    body: any,
    option?: RequestOptions & { observe: 'events' },
    showValidationErrorMessage?: boolean,
  ): Observable<HttpEvent<T>>;

  public post<T>(
    url: string,
    body: any,
    options?: RequestOptions & { observe?: 'body' | 'events' | 'response' },
    showValidationErrorMessage = true,
  ): Observable<HttpEvent<T>> | Observable<HttpResponse<T>> | Observable<T> {
    return this.http
      .post<T>(`${this.host}${url}`, body, options as any)
      .pipe(catchError(error => this.handleError(error, showValidationErrorMessage)));
  }

  public put<T>(
    url: string,
    body: any,
    options?: RequestOptions,
    showValidationErrorMessage?: boolean,
  ): Observable<T>;

  public put<T>(
    url: string,
    body: any,
    option?: RequestOptions & { observe: 'events' },
    showValidationErrorMessage?: boolean,
  ): Observable<HttpEvent<T>>;

  public put<T>(
    url: string,
    body: any,
    options?: RequestOptions & { observe?: 'events' | 'response' | 'body' },
  ): Observable<HttpEvent<T>> | Observable<T> {
    return this.http
      .put<T>(`${this.host}${url}`, body, options as any)
      .pipe(catchError(error => this.handleError(error)));
  }

  private handleError(err: HttpErrorResponse, showValidationErrorMessage?: boolean) {
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(
        `Backend returned code ${err.status}, body was:`,
        typeof err.error === 'string' ? 'HTML body' : err.error,
      );
    }

    // if (err.status !== 422 || showValidationErrorMessage) {
    //   this.store.dispatch(
    //     globalErrorActions.addGlobalError({
    //       error: (typeof err.error !== 'string' && { ...err.error }) || err.error,
    //     }),
    //   );
    // }

    return throwError((isProblemDetailsError(err.error) && err.error) || err);
  }
}

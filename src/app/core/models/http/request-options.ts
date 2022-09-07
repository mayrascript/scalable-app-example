import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface RequestOptions {
  headers?: HttpHeaders | Record<string, string | string[]>;
  params?: HttpParams | Record<string, string | string[]>;
  reportProgress?: boolean;
  withCredentials?: boolean;
}

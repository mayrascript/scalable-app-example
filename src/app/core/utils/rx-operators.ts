import {
  HttpDownloadProgressEvent,
  HttpEvent,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';

import { defer, EMPTY, Observable, of } from 'rxjs';
import { catchError, defaultIfEmpty, filter, finalize, map } from 'rxjs/operators';

import {ListResponse} from "src/app/core/models/api/http/list-response";


export const defaultIfError = <R>(value: R) => <T>(source: Observable<T>) =>
  source.pipe(
    catchError(_ => EMPTY),
    defaultIfEmpty<T, R>(value),
  );

export const prepare = <T>(callback: () => void) => (source: Observable<T>) =>
  defer(() => {
    callback();
    return source;
  });

export const indicate = <T>(indicator: { start: () => void; complete: () => void }) => (
  source: Observable<T>,
) =>
  source.pipe(
    prepare(() => indicator.start()),
    finalize(() => indicator.complete()),
  );

export const toListResponse = (options?: { observe: 'result' }) => <T>(
  source: Observable<ListResponse<T>>,
) => source.pipe(map(response => (options?.observe ? response.data : response)));

export const catchErrorListResponse = (options?: { observe: 'result' }) => <T>(
  source: Observable<T[] | ListResponse<T>>,
) =>
  source.pipe(
    catchError(_ =>
      of(options && options.observe ? ([] as T[]) : ({ data: [], total: 0 } as ListResponse<T>)),
    ),
  );

export const emptyIfError = () => <T>(source: Observable<T>) => source.pipe(catchError(_ => EMPTY));

export const stopIfError = () => <T>(source: Observable<T>) =>
  source.pipe(
    catchError(_ => EMPTY),
    filter<T>(empty => !!empty),
  );

export const stopIfEmpty = () => <T>(source: Observable<T>) =>
  source.pipe(filter<T>(empty => !!empty));

export function toHttpProgress<T>(media: T & { file: File }) {
  return (
    obs: Observable<HttpEvent<any>>,
  ): Observable<
    T & { state: 'uploaded' | 'uploading' | 'fail'; percentage: number; error?: any }
  > =>
    obs.pipe(
      filter(
        (event): event is HttpResponse<T> | HttpDownloadProgressEvent =>
          event instanceof HttpResponse || event.type === HttpEventType.UploadProgress,
      ),
      map(event =>
        event instanceof HttpResponse
          ? { ...media, ...event.body, state: 'uploaded', percentage: 1 }
          : {
              ...media,
              state: 'uploading',
              percentage: event.loaded / (event.total || event.loaded),
            },
      ),
      catchError<any, any>(error => of({ ...media, state: 'fail', error } as const)),
    );
}

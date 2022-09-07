import {Injectable} from "@angular/core";
import {OnDemandPreloadOptions, OnDemandPreloadService} from "./on-demand-preload.service";
import {PreloadingStrategy, Route} from "@angular/router";
import {mergeMap} from "rxjs/operators";
import {EMPTY, Observable} from "rxjs";

@Injectable({ providedIn: 'root', deps: [OnDemandPreloadService] })
export class OnDemandPreloadStrategy implements PreloadingStrategy {
  private preloadOnDemand$: Observable<OnDemandPreloadOptions>;

  constructor(private preloadOnDemandService: OnDemandPreloadService) {
    this.preloadOnDemand$ = this.preloadOnDemandService.state;
  }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return this.preloadOnDemand$.pipe(
      mergeMap(preloadOptions => {
        const shouldPreload = this.preloadCheck(route, preloadOptions);
        return shouldPreload ? load() : EMPTY;
      })
    );
  }

  private preloadCheck(route: Route, preloadOptions: OnDemandPreloadOptions) {
    return (
      route.data &&
      route.data['preload'] &&
      [route.path, '*'].includes(preloadOptions.routePath) &&
      preloadOptions.preload
    );
  }
}

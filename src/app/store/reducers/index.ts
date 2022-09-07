import { InjectionToken } from '@angular/core';
import { Params } from '@angular/router';

import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { getSelectors, routerReducer, RouterReducerState } from '@ngrx/router-store';

import * as fromError from 'src/app/store/reducers/global-error.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  errors: fromError.ErrorState;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State>>('Root reducers token', {
  factory: () => ({
    errors: fromError.globalErrorReducer,
    router: routerReducer,
  }),
});

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const getErrorsState = createFeatureSelector<fromError.ErrorState>('errors');

export const {
  selectCurrentRoute, // select the current route
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getSelectors(getRouterState);

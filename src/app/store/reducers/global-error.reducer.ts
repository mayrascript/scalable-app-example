import { createReducer, on, union } from '@ngrx/store';

import * as fromGlobalErrorActions from 'src/app/store/actions/global-error.actions';
import {
  isProblemDetailsError,
  isValidationError,
  ValidationError,
} from 'src/app/core/models/error';

const all = union(fromGlobalErrorActions);
type GlobalErrorActions = typeof all;

// tslint:disable-next-line:no-empty-interface
export interface ErrorState extends ValidationError {}

const initialState: ErrorState = {
  status: -1,
  title: '',
  'invalid-params': [],
};

export const globalErrorReducer = createReducer(
  initialState,
  on(fromGlobalErrorActions.addGlobalError, (state, { error }) =>
    isValidationError(error) || isProblemDetailsError(error)
      ? { ...state, ...error }
      : { ...state, detail: error },
  ),
);

import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { isNil } from 'lodash-es';

import * as fromGlobalErrorActions from 'src/app/store/actions/global-error.actions';
import {
  isValidationError,
  ValidationError,
  ProblemDetails,
  isProblemDetailsError,
} from 'src/app/core/models/error/validation-error';
import { NotificationService } from 'src/app/core/services/app/notification/notification.service';
import { Messages } from 'src/app/core/constants/messages';

@Injectable()
export class GlobalErrorEffects {
  addGlobalError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromGlobalErrorActions.addGlobalError),
        tap(({ error }: { error: ValidationError | ProblemDetails }) => {
          let message = Messages.Error;
          if (isValidationError(error)) {
            let code = error['invalid-params'].find(e => isNil(e.name))?.code;
            if (!code) {
              code = error['invalid-params'].find(e => !isNil(e.name))?.code;
            }

            message = (Messages as any)[code as any] ?? message;
          } else if (isProblemDetailsError(error)) {
            message = (Messages as any)[error.code as any] ?? message;
          }

          return this.notification.showMessage(message);
        }),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private notification: NotificationService) {}
}

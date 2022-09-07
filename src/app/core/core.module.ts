import { LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-CO';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { LoggerService } from 'src/app/core/logger/logger.service';
import { NotificationService } from 'src/app/core/services/app/notification/notification.service';
import { Environment } from 'src/environments/environment';
import {
  ENVIRONMENT,
  PRIVATE_FALLBACK_URL,
  PUBLIC_FALLBACK_URL,
} from 'src/app/core/constants/global-tokens';
import { BlobErrorHttpInterceptor } from 'src/app/core/interceptors/blob-error-http-interceptor';
import { ApiService } from 'src/app/core/services/app/api/api.service';
import { RequestService } from 'src/app/core/services/app/request/request.service';
import { DASHBOARD_PATH, LOGIN_PATH } from 'src/app/core/constants/paths';
import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { AuthorizationGuard } from 'src/app/core/guards/authorization-guard';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20,
};

registerLocaleData(localeEs);

@NgModule({
  declarations: [],
  imports: [CommonModule,
    MatSnackBarModule
  ],
})
export class CoreModule {
  static forRoot(environment: Environment): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: LOCALE_ID, useValue: 'es-CO' },
        ApiService,
        BlobErrorHttpInterceptor,
        LoggerService,
        NotificationService,
        { provide: ENVIRONMENT, useValue: environment },
        { provide: PUBLIC_FALLBACK_URL, useValue: `/${LOGIN_PATH}` },
        { provide: PRIVATE_FALLBACK_URL, useValue: `/${DASHBOARD_PATH}` },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        {
          provide: PERFECT_SCROLLBAR_CONFIG,
          useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
        },
        // { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
        RequestService,
        AuthorizationGuard,
      ],
    };
  }

  constructor(private loggerService: LoggerService) {
    this.loggerService.info('Initiating app');
  }
}

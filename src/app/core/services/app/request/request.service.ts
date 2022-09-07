import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { isNil } from 'lodash-es';

@Injectable()
export class RequestService {
  getHttpParams(obj?: Record<string, any>) {
    return Object.entries(obj || {}).reduce(
      (params, [key, value]) => (!isNil(value) ? params.append(key, value) : params),
      new HttpParams(),
    );
  }
}

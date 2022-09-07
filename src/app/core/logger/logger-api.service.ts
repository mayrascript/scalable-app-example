import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable, of} from 'rxjs';

import { Log } from 'src/app/core/interfaces/log';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerApiService {
  // private readonly apiUrl = environment.logApiUrl;
  // private readonly appId = environment.appId;
  // private readonly appKey = environment.appKey;

  constructor(private http: HttpClient) {}

  sendLog(log: Log): Observable<any> {
    // TODO: complement this
    return of('TBD')
    // log.applicationId = this.appId;
    // const headers = new HttpHeaders({ key: this.appKey });
    // return this.http.post(this.apiUrl, log, { headers: headers });
  }
}

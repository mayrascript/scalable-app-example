import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from 'src/app/core/services/app/api/api.service';
import { UserDto, UserQuery } from 'src/app/core/models/api/dtos/user/user.dto';
import { RequestService } from 'src/app/core/services/app/request/request.service';
import { ListResponse } from 'src/app/core/models/api/http/list-response';
import {
  catchErrorListResponse,
  stopIfError,
  toListResponse,
} from 'src/app/core/utils/rx-operators';
import { UserStatus } from 'src/app/core/enums/user-status.enum';
import { mapTo, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly endpoint = '/users';

  constructor(private api: ApiService, private request: RequestService) {}

  getById(id: string): Observable<Required<UserDto>> {
    return this.api.get<Required<UserDto>>(`${this.endpoint}/${id}`);
  }

  getAll(query: UserQuery, options: { observe: 'result' }): Observable<UserDto[]>;

  getAll(query?: UserQuery): Observable<ListResponse<UserDto>>;

  getAll(query?: UserQuery, options?: { observe: 'result' }) {
    return this.api
      .get<ListResponse<UserDto>>(this.endpoint, {
        params: this.request.getHttpParams(query),
      })
      .pipe(toListResponse(options), catchErrorListResponse(options));
  }

  updateStatus(id: string, status: UserStatus) {
    return this.api
      .put<void>(`${this.endpoint}/${id}/status`, { status })
      .pipe(mapTo(true), stopIfError());
  }
}

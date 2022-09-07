import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UserDto } from 'src/app/core/models/api/dtos/user/user.dto';
import { ApiService } from 'src/app/core/services/app/api/api.service';
import { stopIfError } from 'src/app/core/utils/rx-operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly endpoint = '/user';

  constructor(private api: ApiService) {}

  get(): Observable<Required<UserDto>> {
    return this.api.get<Required<UserDto>>(`${this.endpoint}`);
  }

  update(user: Partial<UserDto>) {
    return this.api.put<Required<UserDto>>(`${this.endpoint}`, user).pipe(stopIfError());
  }
}

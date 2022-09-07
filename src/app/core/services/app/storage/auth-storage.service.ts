import { Injectable } from '@angular/core';

import { StorageService } from 'src/app/core/services/app/storage/storage.service';
import { UserDto } from 'src/app/core/models/api/dtos/user/user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  private _accessToken?: string | null;
  private _user?: UserDto;
  private readonly tokenKey = 'token';
  private readonly userKey = 'user';

  constructor(private storage: StorageService) {}

  clean(): void {
    this.user = {};
    this.accessToken = '';
    this.storage.clear();
  }

  get accessToken(): string | null {
    this._accessToken = this._accessToken ?? this.storage.retrieve(this.tokenKey);
    return this._accessToken;
  }

  set accessToken(value: string | null) {
    this._accessToken = value;
    if (!value) {
      this.storage.remove(this.tokenKey);
    } else {
      this.storage.store(this.tokenKey, value);
    }
  }

  get user(): UserDto | undefined {
    if (this._user) {
      return this._user;
    }

    const userString = this.storage.retrieve(this.userKey);
    return userString && JSON.parse(userString);
  }

  set user(value: UserDto | undefined) {
    this._user = value;
    this.storage.store(this.userKey, JSON.stringify(value));
  }
}

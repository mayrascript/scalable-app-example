import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { UserService } from 'src/app/core/services/entities/user/user.service';
import { UserDto } from 'src/app/core/models/api/dtos/user/user.dto';
import { NotificationService } from 'src/app/core/services/app/notification/notification.service';
import { Messages } from 'src/app/core/constants/messages';


@Injectable()
export class ProfileFacade {
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _user$ = new BehaviorSubject<Partial<UserDto>>({});

  loading$ = this._loading$.asObservable();
  user$ = this._user$.asObservable();

  constructor(private notification: NotificationService, private userService: UserService) {}

  loadUser() {
    this.userService.get().subscribe((user: UserDto) => this._user$.next(user));
  }

  updateUser(entity: {
    user: Partial<UserDto>;
  }) {
    this._loading$.next(true);

    this.userService
      .update(entity.user)
      .pipe(
        tap((user: UserDto) => this._user$.next(user)),
        finalize(() => this._loading$.next(false)),
      )
      .subscribe(
        () => {},
        () => {
          this.notification.showMessage(Messages.Saved);
        },
      );
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProfileForm } from 'src/app/dashboard/profile/profile.form';
import { ProfileFacade } from 'src/app/dashboard/profile/profile.facade';
import { isValidForm } from 'src/app/core/utils/forms';
import { NotificationService } from 'src/app/core/services/app/notification/notification.service';
import { Messages } from 'src/app/core/constants/messages';
import { DASHBOARD_URL } from 'src/app/core/constants/paths';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileForm],
})
export class ProfileComponent implements OnInit, OnDestroy {
  loading$ = this.facade.loading$;

  private destroy$ = new Subject();

  constructor(
    private facade: ProfileFacade,
    public form: ProfileForm,
    private notification: NotificationService,
    private ref: ChangeDetectorRef,
    private router: Router,
  ) {
    this.form.ref = ref;
  }

  ngOnInit() {
    this.facade.user$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      this.form.mapToForm(user);
      this.ref.markForCheck();
    });

    this.facade.loadUser();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCancel() {
    this.router.navigate([DASHBOARD_URL]);
  }

  onSubmit() {
    if (!isValidForm(this.form)) {
      return this.notification.showMessage(Messages.InvalidForm);
    }

    const entity = this.form.formToEntity();
    this.facade.updateUser(entity);
    this.notification.showMessage(Messages.Saving);
  }
}

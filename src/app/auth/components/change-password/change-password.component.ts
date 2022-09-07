import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { finalize, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { CustomErrorStateMatcher } from 'src/app/core/helpers/error-state-matcher';
import { AuthService } from 'src/app/core/services/app/auth/auth.service';
import { NotificationService } from 'src/app/core/services/app/notification/notification.service';
import { Messages } from 'src/app/core/constants/messages';
import { CustomValidators } from 'src/app/core/helpers/custom-validators';
import { fadeInAnimation } from 'src/app/core/animations/fade-in';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  animations: fadeInAnimation,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent implements OnInit {
  form!: FormGroup;

  matcher = new CustomErrorStateMatcher();
  customValidators = new CustomValidators();

  email$: Observable<string>;
  showForm$ = new BehaviorSubject(true);
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
  ) {
    this.email$ = this.route.queryParams.pipe(map(({ email }) => email));
  }

  ngOnInit(): void {
    const password = this.fb.control('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]);

    this.form = this.fb.group({
      password,
      confirmPassword: [
        '',
        [Validators.required, this.customValidators.passwordMatchValidator(password)],
      ],
    });
  }

  send() {
    const { password: newPassword } = this.form.value;
    this.loading = true;

    this.route.queryParams
      .pipe(
        switchMap(({ email, token }) =>
          this.authService.changePassword({ email, token, newPassword }),
        ),
        finalize(() => (this.loading = false)),
      )
      .subscribe(
        () => {
          this.notificationService.showMessage(Messages.SuccessfulRequest);
          this.showForm$.next(false);
        },
        () => {},
      );
  }
}

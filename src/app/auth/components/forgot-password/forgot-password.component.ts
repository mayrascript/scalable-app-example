import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { CustomErrorStateMatcher } from 'src/app/core/helpers/error-state-matcher';
import { AuthService } from 'src/app/core/services/app/auth/auth.service';
import { NotificationService } from 'src/app/core/services/app/notification/notification.service';
import { Messages } from 'src/app/core/constants/messages';
import { fadeInAnimation } from 'src/app/core/animations/fade-in';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: fadeInAnimation,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;

  matcher = new CustomErrorStateMatcher();
  showForm$ = new BehaviorSubject(true);
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  send() {
    const { email } = this.form.value;
    this.loading = true;
    this.authService
      .forgotPassword(email)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => {
          this.notificationService.showMessage(Messages.SuccessfulRequest);
          this.showForm$.next(false);
        },
        () => {},
      );
  }
}

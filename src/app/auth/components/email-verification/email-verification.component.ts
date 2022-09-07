import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, switchMap } from 'rxjs/operators';
import { Messages } from 'src/app/core/constants/messages';
import { AuthService } from 'src/app/core/services/app/auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationService } from 'src/app/core/services/app/notification/notification.service';
import { fadeInAnimation } from 'src/app/core/animations/fade-in';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
  animations: fadeInAnimation,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailVerificationComponent implements OnInit {
  loading = false;
  showOnVerificationView$ = new BehaviorSubject(true);
  email$: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {
    this.email$ = this.route.queryParams.pipe(map(({ email }) => email));
  }

  ngOnInit(): void {
    this.verifyEmail();
  }

  verifyEmail() {
    this.loading = true;

    this.route.queryParams
      .pipe(
        switchMap(({ email, token }) => this.authService.verifyEmail({ email, token })),
        finalize(() => (this.loading = false)),
      )
      .subscribe(
        () => {
          this.notificationService.showMessage(Messages.SuccessfulRequest);
          this.showOnVerificationView$.next(false);
        },
        () => {},
      );
  }
}

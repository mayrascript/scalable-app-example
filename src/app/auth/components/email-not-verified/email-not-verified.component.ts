import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval, Observable, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, switchMap, takeWhile } from 'rxjs/operators';
import { Messages } from 'src/app/core/constants/messages';
import { AuthService } from 'src/app/core/services/app/auth/auth.service';
import { NotificationService } from 'src/app/core/services/app/notification/notification.service';
import { fadeInAnimation } from 'src/app/core/animations/fade-in';

@Component({
  selector: 'app-email-not-verified',
  templateUrl: './email-not-verified.component.html',
  styleUrls: ['./email-not-verified.component.scss'],
  animations: fadeInAnimation,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailNotVerifiedComponent implements OnInit {
  loading = false;
  showVerificationView$ = new BehaviorSubject(true);
  email$: Observable<string>;
  totalSeconds = 30;
  seconds$ = new BehaviorSubject(this.totalSeconds);

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {
    this.email$ = this.route.params.pipe(map(({ email }) => email));
  }

  ngOnInit(): void {
    interval(1000)
      .pipe(
        map(value => this.totalSeconds - value - 1),
        takeWhile(val => val >= 0),
      )
      .subscribe(timeEllapsed => this.seconds$.next(timeEllapsed));
  }

  resendEmail() {
    this.loading = true;

    this.email$
      .pipe(
        switchMap(email => this.authService.sendEmailToVerify({ email })),
        finalize(() => (this.loading = false)),
      )
      .subscribe(
        () => {
          this.notificationService.showMessage(Messages.SuccessfulRequest);
          this.showVerificationView$.next(false);
        },
        () => {},
      );
  }
}

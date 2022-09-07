import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/app/notification/notification.service';
import { CustomErrorStateMatcher } from 'src/app/core/helpers/error-state-matcher';
import {
  AuthService,
  IUserLogin,
} from 'src/app/core/services/app/auth/auth.service';
import { Messages } from 'src/app/core/constants/messages';
import { fadeInAnimation } from 'src/app/core/animations/fade-in';
import { DASHBOARD_URL } from 'src/app/core/constants/paths';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: fadeInAnimation,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  matcher = new CustomErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
    });
  }

  login() {
    const userLogin = this.loginForm.value as IUserLogin;
    this.authService.login(userLogin).subscribe(
      () => {
        this.notificationService.showMessage(Messages.LoginWelcome);
        this.goToDashboard();
      },
      err => {
        if (err.code === 'EmailNotVerified') {
          this.goToNotVerified(userLogin.email);
        }
      },
    );
  }

  goToDashboard = () => this.router.navigate([DASHBOARD_URL]);

  goToNotVerified = (email: string) => this.router.navigate(['/auth/email-not-verified', email]);
}

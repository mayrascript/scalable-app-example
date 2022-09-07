import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/app/notification/notification.service';
import { AuthService } from 'src/app/core/services/app/auth/auth.service';
import { CustomErrorStateMatcher } from 'src/app/core/helpers/error-state-matcher';
import { Messages } from 'src/app/core/constants/messages';
import { CreateUserDto } from 'src/app/core/models/api/dtos/user/create-user.dto';
import { CustomValidators } from 'src/app/core/helpers/custom-validators';
import { fadeInAnimation } from 'src/app/core/animations/fade-in';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: fadeInAnimation,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  matcher = new CustomErrorStateMatcher();
  customValidators = new CustomValidators();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const password = this.fb.control('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]);

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      countryPrefix: [57, [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      company: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      shipsNumber: [1, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password,
      confirmPassword: [
        '',
        [Validators.required, this.customValidators.passwordMatchValidator(password)],
      ],
    });
  }

  register() {
    const user = this.registerForm.value as CreateUserDto;
    this.authService.register(user).subscribe(
      () => {
        this.notificationService.showMessage(Messages.LoginUserSuccessfullCreated);
        if (user.email) {
          this.goToNotVerified(user.email);
        }
      },
      () => {},
    );
  }

  goToNotVerified = (email: string) => this.router.navigate(['/auth/email-not-verified', email]);
}

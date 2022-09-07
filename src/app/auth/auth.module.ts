import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthComponent } from 'src/app/auth/auth.component';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';
import { ForgotPasswordComponent } from 'src/app/auth/components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { EmailNotVerifiedComponent } from './components/email-not-verified/email-not-verified.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    EmailVerificationComponent,
    EmailNotVerifiedComponent,
  ],
  imports: [AuthRoutingModule, SharedModule],
})
export class AuthModule {}

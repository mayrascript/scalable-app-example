import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from 'src/app/auth/auth.component';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { RegisterComponent } from 'src/app/auth/components/register/register.component';
import { ForgotPasswordComponent } from 'src/app/auth/components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from 'src/app/auth/components/change-password/change-password.component';
import { EmailVerificationComponent } from 'src/app/auth/components/email-verification/email-verification.component';
import { EmailNotVerifiedComponent } from 'src/app/auth/components/email-not-verified/email-not-verified.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'email-not-verified/:email',
        component: EmailNotVerifiedComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'email-verification',
        component: EmailVerificationComponent,
      },
      {
        path: '',
        redirectTo: 'login',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/app/core/services/app/api/api.service';
import { AuthStorageService } from 'src/app/core/services/app/storage/auth-storage.service';
import { UserDto } from 'src/app/core/models/api/dtos/user/user.dto';
import { CreateUserDto } from 'src/app/core/models/api/dtos/user/create-user.dto';
import { LoginUserResponseDto } from 'src/app/core/models/api/dtos/user/login-user-response.dto';
import { isTokenExpired } from 'src/app/core/utils/token';
import { ChangePasswordDto } from 'src/app/core/models/api/dtos/user/change-password.dto';
import { VerifyEmailDto } from 'src/app/core/models/api/dtos/user/verify-email.dto';
import { EmailVerificationDto } from 'src/app/core/models/api/dtos/user/email-verification.dto';

export interface IUserLogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly endpoint = '/auth';

  constructor(private http: ApiService, private authStorageService: AuthStorageService) {}

  isAuthorized(): Observable<boolean> {
    const token = this.authStorageService.accessToken;
    if (token && !isTokenExpired(token)) {
      return of(true);
    }

    this.logout();
    return of(false);
  }

  getAccessToken() {
    return of(this.authStorageService.accessToken);
  }

  login(userLogin: IUserLogin) {
    const body = userLogin;

    return this.http.post<LoginUserResponseDto>(`${this.endpoint}/login`, body).pipe(
      map(res => {
        this.saveUserInfo(res);
      }),
    );
  }

  register(user: CreateUserDto) {
    return this.http.post<void>(`${this.endpoint}/register`, user);
  }

  forgotPassword(email: string) {
    return this.http.post<void>(`${this.endpoint}/forgot-password`, { email });
  }

  changePassword(changePassword: ChangePasswordDto) {
    return this.http.post<void>(`${this.endpoint}/change-password`, changePassword);
  }

  /*
   * Use this to send the email with the link to verify
   */
  sendEmailToVerify(emailVerification: EmailVerificationDto) {
    return this.http.post<void>(`${this.endpoint}/email-verification`, emailVerification);
  }

  /*
   * Use this once you have the toke and the email
   */
  verifyEmail(verifyEmail: VerifyEmailDto) {
    return this.http.post<void>(`${this.endpoint}/verify-email`, verifyEmail);
  }

  logout() {
    this.authStorageService.clean();
  }

  private saveUserInfo(res: any) {
    if (res.accessToken) {
      this.saveToken(res.accessToken);
    }

    if (res.user) {
      this.saveUserData(res.user);
    }
  }

  private saveToken(accessToken: string) {
    this.authStorageService.accessToken = accessToken;
  }

  private saveUserData(user: UserDto) {
    this.authStorageService.user = user;
  }
}

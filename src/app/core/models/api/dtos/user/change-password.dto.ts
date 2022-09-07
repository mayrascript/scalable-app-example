export interface ChangePasswordDto {
  readonly email?: string;
  readonly newPassword?: string;
  readonly token?: string;
}

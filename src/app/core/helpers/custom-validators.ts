import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  passwordMatchValidator = (password: AbstractControl) => (passwordConfirm: AbstractControl) =>
    password.value === passwordConfirm.value ? null : { mismatch: true };
}

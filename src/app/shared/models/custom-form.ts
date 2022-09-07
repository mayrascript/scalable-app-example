import { ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export abstract class CustomForm {
  cascadeValidation = true;
  abstract group: FormGroup;
  messages: Record<string, Record<string, string>> = {};

  protected constructor(private matcher: ErrorStateMatcher) {}

  set ref(value: ChangeDetectorRef) {
    this._ref = value;
  }

  // tslint:disable-next-line:variable-name
  protected _ref?: ChangeDetectorRef;

  getErrors(controlName: string, control?: AbstractControl | null): string[] {
    control = control || this.group.get(controlName);
    if (!control || !this.matcher.isErrorState(control as any, null)) {
      return [] as string[];
    }

    return Object.keys(control.errors || {}).reduce(
      (list, key, index) =>
        (this.cascadeValidation && index > 0 && list) || [...list, this.messages[controlName][key]],
      [] as string[],
    );
  }

  isValid(controlName?: string | null, control?: AbstractControl | null) {
    control = control || this.group.get(controlName || '');
    return control ? control.valid : this.group.valid || this.group.disabled;
  }

  updateValueAndValidity(control?: AbstractControl) {
    control = control || this.group;
    control.updateValueAndValidity();
    control.markAllAsTouched();
    if (this._ref) {
      this._ref.markForCheck();
    }
  }
}

import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';

import { Subject } from 'rxjs';

import { CustomForm } from 'src/app/shared/models/custom-form';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnChanges, OnDestroy {
  @Input() form?: CustomForm;
  @Input() controlName!: string;

  control?: AbstractControl | null;

  private destroy$ = new Subject();

  constructor(private formGroupDirective: FormGroupDirective) {
    this.subscriptToFormGroupDirectiveChanges();
  }

  ngOnChanges() {
    this.control = this.formGroupDirective.control.get(this.controlName);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscriptToFormGroupDirectiveChanges() {
    const originFormControlNgOnChanges = this.formGroupDirective.ngOnChanges;
    this.formGroupDirective.ngOnChanges = changes => {
      originFormControlNgOnChanges.apply(this.formGroupDirective, [changes]);
      if (changes.form) {
        this.ngOnChanges();
      }
    };
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MessageDialogComponent } from 'src/app/shared/components/dialogs';
import { SanitizeHtmlPipe } from 'src/app/shared/pipes/sanitize-html.pipe';
import { MaterialModule } from 'src/app/shared/material.module';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { StringToNumberPipe } from 'src/app/shared/pipes/string-to-number.pipe';
import { PermissionDirective } from 'src/app/shared/directives/permission.directive';
import { SelectFilterDirective } from 'src/app/shared/directives/filters/select-filter.directive';
import { TextFilterDirective } from 'src/app/shared/directives/filters/text-filter.directive';
import { DateFilterDirective } from 'src/app/shared/directives/filters/date-filter.directive';
import { CheckboxFilterDirective } from 'src/app/shared/directives/filters/checkbox-filter.directive';
import { ProgressButtonDirective } from 'src/app/shared/directives/progress-button.directive';

const modules = [CommonModule, ReactiveFormsModule, MaterialModule];

const components = [
  MessageDialogComponent,
  ErrorComponent,
];

const directives = [
  ProgressButtonDirective,
  PermissionDirective,
  SelectFilterDirective,
  TextFilterDirective,
  DateFilterDirective,
  CheckboxFilterDirective,
];

const pipes = [
  SanitizeHtmlPipe,
  StringToNumberPipe,
];

const providers = [DialogService];

@NgModule({
  declarations: [...components, ...directives, ...pipes],
  exports: [...modules, ...components, ...directives, ...pipes],
  imports: [...modules],
  providers,
})
export class SharedModule {}

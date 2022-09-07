import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

import { Observable } from 'rxjs';

import {
  DialogResult,
  MessageDialogComponent,
  DialogType,
  DialogOptions,
} from 'src/app/shared/components/dialogs';

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) {}

  showConfirmDialog(
    title: string,
    message: string,
    options?: DialogOptions,
  ): Observable<DialogResult> {
    const dialog = this.dialog.open(MessageDialogComponent, {
      data: { title, message, options, type: DialogType.Confirm },
    });

    return dialog.componentInstance.dialogResult$;
  }

  showCustomDialog<T>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    options?: Record<string, any>,
    backdropClass?: string,
    width?: string,
  ): MatDialogRef<T> {
    return this.dialog.open(componentOrTemplateRef, {
      data: options,
      disableClose: true,
      backdropClass,
      width,
    });
  }

  showMessageDialog(
    title: string,
    message: string,
    options?: Pick<DialogOptions, 'btnOkText'>,
  ): Observable<DialogResult> {
    const dialog = this.dialog.open(MessageDialogComponent, {
      data: { title, message, options, type: DialogType.Message },
      disableClose: true,
    });

    return dialog.componentInstance.dialogResult$;
  }
}

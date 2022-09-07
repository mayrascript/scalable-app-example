import { Component, Optional, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Subject } from 'rxjs';

import { DialogResult } from 'src/app/shared/components/dialogs/dialog-result.enum';
import { DialogType } from 'src/app/shared/components/dialogs/dialog-type.enum';
import { DialogOptions } from 'src/app/shared/components/dialogs/dialog-options';

// tslint:disable-next-line:interface-over-type-literal
type DialogData = { title: string; message: string; options?: DialogOptions; type: DialogType };

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageDialogComponent {
  dialogResult$ = new Subject<DialogResult>();
  message = '';
  options?: DialogOptions;
  title: string;
  type: DialogType;
  types = DialogType;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: DialogData,
    public dialogRef: MatDialogRef<MessageDialogComponent>,
  ) {
    this.title = this.dialogData.title ?? '';
    this.message = this.dialogData.message ?? '';
    this.type = this.dialogData.type;
    this.options = this.dialogData.options;
  }

  onClick(value: 'accept' | 'cancel'): void {
    this.dialogResult$.next(value === 'accept' ? DialogResult.Ok : DialogResult.Cancel);
    this.dialogResult$.complete();
    this.dialogRef.close();
  }
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showMessage(message: string): void {
    this.snackBar.open(message, undefined, {
      duration: 3000,
    });
  }
}

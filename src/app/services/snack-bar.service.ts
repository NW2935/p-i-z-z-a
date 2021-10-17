import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    private defaultAction = 'Dismiss';

    private defaultDuration = 3000;

    constructor(
        private snackbar: MatSnackBar
    ) { }

    displayConfirmationSnackBar(message: string): void {
        this.displaySnackBar(message, 'app-snackbar-success');
    }

    displayErrorSnackBar(message: string): void {
        this.displaySnackBar(message, 'app-snackbar-error');
    }

    private displaySnackBar(message: string, panelClass: string): void {
        this.snackbar.open(message, this.defaultAction, { duration: this.defaultDuration, panelClass });
    }
}

import { ConfirmationDialogModel } from 'src/app/models/confirmation-dialog-model';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
    title: string;
    message: string;

    constructor(
        private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: ConfirmationDialogModel
    ) {
        this.title = data.title;
        this.message = data.message;
    }

    public onCancelClick(): void {
        this.dialogRef.close(false);
    }

    public onSubmitClick(): void {
        this.dialogRef.close(true);
    }
}

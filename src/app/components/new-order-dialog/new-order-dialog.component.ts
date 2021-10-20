import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-new-order-dialog',
    templateUrl: './new-order-dialog.component.html',
    styleUrls: ['./new-order-dialog.component.css']
})
/**
 * This component defines the content of the dialog displayed when a user wants to create
 * a new pizza order.
 */
export class NewOrderDialogComponent{
    public pizzaForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<NewOrderDialogComponent>
    ) {
        this.pizzaForm = this.formBuilder.group({
            Crust: ['', Validators.required],
            Flavor: ['', Validators.required],
            Size: ['', Validators.required],
            Table_No: ['', Validators.required]
        });
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onSubmitClick(): void {
        this.dialogRef.close(this.pizzaForm.value);
    }
}

/**
 * This model is used to initialize the generic confirmation dialog.
 */
export class ConfirmationDialogModel {
    title: string;
    message: string;

    constructor(dialogTitle: string, dialogMessage: string) {
        this.title = dialogTitle;
        this.message = dialogMessage;
    }
}

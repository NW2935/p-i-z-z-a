export class ConfirmationDialogModel {
    title: string;
    message: string;

    constructor(dialogTitle: string, dialogMessage: string) {
        this.title = dialogTitle;
        this.message = dialogMessage;
    }
}

import { Component } from '@angular/core';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogModel } from 'src/app/models/confirmation-dialog-model';
import { PizzaService } from 'src/app/services/pizza.service';
import { filter, switchMap } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
    displayedColumns: string[] = ['Order_ID', 'Table_No', 'Timestamp', 'Size', 'Crust', 'Flavor', 'Delete'];

    constructor(
        public pizzaService: PizzaService,
        private dialog: MatDialog
    ) {
        this.pizzaService.refreshPizzaOrders$().subscribe();
    }

    public onDeleteOrderClick(orderId: number) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.data = new ConfirmationDialogModel('Confirm Delete', `Are you sure you want to cancel order number ${orderId}?`);
    
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
        dialogRef.afterClosed().pipe(
            filter((confirmedDelete: boolean): boolean => confirmedDelete),
            switchMap(() => this.pizzaService.deletePizzaOrder$(orderId))
        ).subscribe();
    }
}

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogModel } from 'src/app/models/confirmation-dialog-model';
import { MatTableDataSource } from '@angular/material/table';
import { PizzaOrder } from 'src/app/models/pizza-order';
import { PizzaService } from 'src/app/services/pizza.service';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
/**
 * This component is responsible for displaying a list of all orders retrieved by the PizzaService in a table, 
 * as well as permitting users to delete pizzas.
 */
export class OrdersComponent implements OnInit, OnChanges, OnDestroy {
    @Input() filterToken = '';

    dataSource = new MatTableDataSource<PizzaOrder>();
    displayedColumns: string[] = ['Order_ID', 'Table_No', 'Timestamp', 'Size', 'Crust', 'Flavor', 'Delete'];
    private subscription = new Subscription();

    constructor(
        public pizzaService: PizzaService,
        private dialog: MatDialog
    ) {
        this.subscription.add(this.pizzaService.refreshPizzaOrders$().subscribe());
    }

    ngOnInit(): void {
        this.subscription.add(this.pizzaService.pizzaOrders$.subscribe((pizzaOrders: PizzaOrder[]): void => {
            this.dataSource.data = pizzaOrders;
        }));
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.dataSource.filter = changes.filterToken?.currentValue;
    }

    public onDeleteOrderClick(orderId: number): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.data = new ConfirmationDialogModel('Confirm Delete', `Are you sure you want to cancel order number ${orderId}?`);
    
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
        this.subscription.add(dialogRef.afterClosed().pipe(
            filter((confirmedDelete: boolean): boolean => confirmedDelete),
            switchMap((): Observable<void> => this.pizzaService.deletePizzaOrder$(orderId))
        ).subscribe());
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

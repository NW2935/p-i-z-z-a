import { NewOrderDialogComponent } from '../new-order-dialog/new-order-dialog.component';
import { PizzaOrder } from 'src/app/models/pizza-order';
import { PizzaService } from 'src/app/services/pizza.service';
import { Component, OnDestroy } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
/**
 * The dashboard component is the main page for this application if the user is authenticated.
 * It allows for viewing, creating, deleting, and filtering pizza orders.
 */
export class DashboardComponent implements OnDestroy {
    filterToken = '';
    private subscription = new Subscription();

    constructor(
        private dialog: MatDialog,
        private pizzaService: PizzaService
    ) { }
    
    onNewOrderClick(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;

        const dialogRef = this.dialog.open(NewOrderDialogComponent, dialogConfig);
        this.subscription.add(dialogRef.afterClosed().pipe(
            filter((formData: any): boolean => !!formData),
            switchMap((newPizzaOrder: PizzaOrder): Observable<void> => this.pizzaService.submitPizzaOrder$(newPizzaOrder))
        ).subscribe());
    }

    onFilterKeyUp(event: KeyboardEvent): void {
        const filterToken = (<HTMLInputElement>event.target).value;
        this.filterToken = filterToken.trim().toLocaleLowerCase();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

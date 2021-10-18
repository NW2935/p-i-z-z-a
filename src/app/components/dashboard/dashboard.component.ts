import { Component } from '@angular/core';
import { NewOrderDialogComponent } from '../new-order-dialog/new-order-dialog.component';
import { Observable } from 'rxjs';
import { PizzaOrder } from 'src/app/models/pizza-order';
import { PizzaService } from 'src/app/services/pizza.service';
import { filter, switchMap } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    filterToken = '';

    constructor(
        private dialog: MatDialog,
        private pizzaService: PizzaService
    ) { }
    
    onNewOrderClick(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;

        const dialogRef = this.dialog.open(NewOrderDialogComponent, dialogConfig);
        dialogRef.afterClosed().pipe(
            filter((formData: any): boolean => !!formData),
            switchMap((newPizzaOrder: PizzaOrder): Observable<void> => this.pizzaService.submitPizzaOrder$(newPizzaOrder))
        ).subscribe();
    }

    onFilterKeyUp(event: KeyboardEvent): void {
        const filterToken = (<HTMLInputElement>event.target).value;
        this.filterToken = filterToken.trim().toLocaleLowerCase();
    }
}

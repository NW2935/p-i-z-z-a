import { Component } from '@angular/core';
import { NewOrderDialogComponent } from '../new-order-dialog/new-order-dialog.component';
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
            filter((formData: any) => formData),
            switchMap((newPizzaOrder: PizzaOrder) => this.pizzaService.submitPizzaOrder$(newPizzaOrder))
        ).subscribe();
    }
}

import { Component } from '@angular/core';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
    displayedColumns: string[] = ['Order_ID', 'Table_No', 'Timestamp', 'Size', 'Crust', 'Flavor'];

    constructor(
        public pizzaService: PizzaService
    ) {
        this.pizzaService.getPizzaOrders$().subscribe();
    }
}

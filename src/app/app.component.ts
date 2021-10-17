import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
import { PizzaService } from './services/pizza.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(
        private authenticationService: AuthenticationService,
        private pizzaService: PizzaService
    ) {
        this.authenticationService.authenticate$('test', 'test').subscribe((result) => console.log(result));
        this.pizzaService.getPizzaOrders$().subscribe();
    }

}

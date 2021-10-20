import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PizzaMockBackEndInterceptor } from '../mocks/pizza-mock-backend.interceptor';
import { PizzaService } from './pizza.service';
import { SnackBarService } from './snack-bar.service';
import { Subscription } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('PizzaService', (): void => {
    let pizzaService: PizzaService;
    let subscription: Subscription;

    beforeEach((): void => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                HttpClientTestingModule,
                MatSnackBarModule
            ],
            providers: [
                { provide: HTTP_INTERCEPTORS, useClass: PizzaMockBackEndInterceptor, multi: true }
            ]
        });
        pizzaService = TestBed.inject(PizzaService);
        subscription = new Subscription();
    });

    afterEach((): void => {
        subscription.unsubscribe();
    });

    it('should be created', (): void => {
        expect(pizzaService).toBeTruthy();
    });

    it('should update pizzaOrders$ when refreshPizzaOrders succeeds', (): void => {
        const pizzaOrdersSubscribeSpy = jasmine.createSpy();
        subscription.add(pizzaService.pizzaOrders$.subscribe(pizzaOrdersSubscribeSpy));
        subscription.add(pizzaService.refreshPizzaOrders$().subscribe());

        // called once with initial value of [] + request
        expect(pizzaOrdersSubscribeSpy).toHaveBeenCalledTimes(2);
    });

    it('should call refreshPizzaOrders when submitPizzaOrder succeeds', (): void => {
        const refreshOrdersSpy = spyOn(pizzaService, 'refreshPizzaOrders$');
        const snackbarSpy = spyOn(TestBed.inject(SnackBarService), 'displayConfirmationSnackBar').and.callThrough();
        subscription.add(pizzaService.submitPizzaOrder$({ Size: 'test', Crust: 'test', Flavor: 'test', Table_No: 10 }).subscribe());

        expect(snackbarSpy).toHaveBeenCalled();
        expect(refreshOrdersSpy).toHaveBeenCalled();
    });

    it('should display an error when submitPizzaOrder fails', (): void => {
        const refreshOrdersSpy = spyOn(pizzaService, 'refreshPizzaOrders$');
        const snackbarSpy = spyOn(TestBed.inject(SnackBarService), 'displayErrorSnackBar').and.callThrough();
        subscription.add(pizzaService.submitPizzaOrder$({ Size: 'test', Crust: 'test', Flavor: 'fail', Table_No: 10 }).subscribe());

        expect(snackbarSpy).toHaveBeenCalled();
        expect(refreshOrdersSpy).not.toHaveBeenCalled();
    });

    it('should call refreshPizzaOrders when deletePizzaOrder succeeds', (): void => {
        const refreshOrdersSpy = spyOn(pizzaService, 'refreshPizzaOrders$');
        const snackbarSpy = spyOn(TestBed.inject(SnackBarService), 'displayConfirmationSnackBar').and.callThrough();
        // 10 is the only ID that can be deleted in the mock backend
        subscription.add(pizzaService.deletePizzaOrder$(10).subscribe());

        expect(snackbarSpy).toHaveBeenCalled();
        expect(refreshOrdersSpy).toHaveBeenCalled();
    });

    it('should display an error when deletePizzaOrder fails', (): void => {
        const refreshOrdersSpy = spyOn(pizzaService, 'refreshPizzaOrders$');
        const snackbarSpy = spyOn(TestBed.inject(SnackBarService), 'displayErrorSnackBar').and.callThrough();
        subscription.add(pizzaService.deletePizzaOrder$(1).subscribe());

        expect(snackbarSpy).toHaveBeenCalled();
        expect(refreshOrdersSpy).not.toHaveBeenCalled();
    });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { OrdersComponent } from './orders.component';
import { OrdersPageObject } from 'src/app/page-objects/orders.pageobject';
import { PizzaService } from 'src/app/services/pizza.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('OrdersComponent', (): void => {
    let component: OrdersComponent;
    let fixture: ComponentFixture<OrdersComponent>;
    let pageObject: OrdersPageObject;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatSnackBarModule,
                MatDialogModule,
                MatTableModule
            ],
            declarations: [ OrdersComponent ]
        });
    });

    beforeEach((): void => {
        fixture = TestBed.createComponent(OrdersComponent);
        component = fixture.componentInstance;
        pageObject = new OrdersPageObject(fixture);
        fixture.detectChanges();
    });

    it('should create', (): void => {
        expect(component).toBeTruthy();
    });

    it('should delete pizzaOrder from dataSource when user confirms delete', (): void => {
        pageObject.configureDeleteConfirmDialogWithValue(true);
        const submitPizzaOrderSpy = spyOn(TestBed.inject(PizzaService), 'deletePizzaOrder$').and.returnValue(of());
        component.onDeleteOrderClick(10);
        expect(submitPizzaOrderSpy).toHaveBeenCalled();
    });

    it('should not update dataSource when user cancels delete', (): void => {
        pageObject.configureDeleteConfirmDialogWithValue(false);
        const submitPizzaOrderSpy = spyOn(TestBed.inject(PizzaService), 'deletePizzaOrder$').and.returnValue(of());
        component.onDeleteOrderClick(10);
        expect(submitPizzaOrderSpy).not.toHaveBeenCalled();
    });
});

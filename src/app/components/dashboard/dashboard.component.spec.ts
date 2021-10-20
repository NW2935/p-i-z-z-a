import { DashboardComponent } from './dashboard.component';
import { DashboardPageObject } from 'src/app/page-objects/dashboard.pageobject';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { OrdersComponent } from '../orders/orders.component';
import { PizzaService } from 'src/app/services/pizza.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('DashboardComponent', (): void => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let pizzaService: PizzaService;
    let pageObject: DashboardPageObject;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatDialogModule,
                MatSnackBarModule,
                MatTableModule
            ],
            declarations: [
                DashboardComponent,
                OrdersComponent
            ]
        });

        pizzaService = TestBed.inject(PizzaService);
    });

    beforeEach((): void => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        pageObject = new DashboardPageObject(fixture);
        fixture.detectChanges();
    });

    it('should create', (): void => {
        expect(component).toBeTruthy();
    });

    it('should submit pizza order when new order submit button is clicked', (): void => {
        const mockPizzaOrder = { Crust: 'test', Flavor: 'test', Size: 'test', Table_No: 1 };
        pageObject.configureCloseDialogWithValue(mockPizzaOrder);
        const submitPizzaOrderSpy = spyOn(pizzaService, 'submitPizzaOrder$').and.returnValue(of());
        component.onNewOrderClick();
        expect(submitPizzaOrderSpy).toHaveBeenCalledWith(mockPizzaOrder);
    });

    it('should not submit pizza order when new order cancel button is clicked', (): void => {
        pageObject.configureCloseDialogWithValue();
        const submitPizzaOrderSpy = spyOn(pizzaService, 'submitPizzaOrder$').and.returnValue(of());
        component.onNewOrderClick();
        expect(submitPizzaOrderSpy).not.toHaveBeenCalled();
    });
});

import { OrdersComponent } from './orders.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('OrdersComponent', (): void => {
    let component: OrdersComponent;
    let fixture: ComponentFixture<OrdersComponent>;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            declarations: [ OrdersComponent ]
        })
            .compileComponents();
    });

    beforeEach((): void => {
        fixture = TestBed.createComponent(OrdersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', (): void => {
        expect(component).toBeTruthy();
    });
});

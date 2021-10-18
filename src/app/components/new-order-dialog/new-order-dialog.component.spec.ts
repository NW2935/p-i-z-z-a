import { NewOrderDialogComponent } from './new-order-dialog.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('NewOrderDialogComponent', (): void => {
    let component: NewOrderDialogComponent;
    let fixture: ComponentFixture<NewOrderDialogComponent>;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            declarations: [ NewOrderDialogComponent ]
        })
            .compileComponents();
    });

    beforeEach((): void => {
        fixture = TestBed.createComponent(NewOrderDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', (): void => {
        expect(component).toBeTruthy();
    });
});

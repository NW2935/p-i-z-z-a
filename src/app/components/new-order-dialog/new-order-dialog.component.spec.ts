import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NewOrderDialogComponent } from './new-order-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('NewOrderDialogComponent', (): void => {
    let component: NewOrderDialogComponent;
    let fixture: ComponentFixture<NewOrderDialogComponent>;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                ReactiveFormsModule,
                MatDialogModule,
                MatInputModule,
                MatFormFieldModule
            ],
            declarations: [ NewOrderDialogComponent ],
            providers: [
                { provide: MatDialogRef, useValue: {} }
            ]
        });
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

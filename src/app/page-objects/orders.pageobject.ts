import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { of } from 'rxjs';
import { OrdersComponent } from '../components/orders/orders.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

export class OrdersPageObject {
    component: OrdersComponent;

    constructor(fixture: ComponentFixture<OrdersComponent>) {
        this.component = fixture.componentInstance;
    }

    configureDeleteConfirmDialogWithValue(approveDelete: boolean): void {
        const dialogRefSpy: MatDialogRef<ConfirmationDialogComponent> = jasmine.createSpyObj({ afterClosed: of(approveDelete) });
        spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpy);
    }
}
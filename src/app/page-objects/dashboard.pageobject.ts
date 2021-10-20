import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { NewOrderDialogComponent } from '../components/new-order-dialog/new-order-dialog.component';
import { of } from 'rxjs';
import { PizzaOrder } from '../models/pizza-order';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

/**
 * Page object for testing the DashboardComponent.
 */
export class DashboardPageObject {
    component: DashboardComponent;

    constructor(fixture: ComponentFixture<DashboardComponent>) {
        this.component = fixture.componentInstance;
    }

    configureCloseDialogWithValue(returnValue?: PizzaOrder): void {
        const dialogRefSpy: MatDialogRef<NewOrderDialogComponent> = jasmine.createSpyObj({ afterClosed: of(returnValue ? returnValue : undefined) });
        spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpy);
    }
}
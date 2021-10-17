import { Injectable } from '@angular/core';
import { PizzaOrder } from '../models/pizza-order';
import { SnackBarService } from './snack-bar.service';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PizzaService {
    public pizzaOrders$: Observable<PizzaOrder[]>;

    private _pizzaOrders$ =  new BehaviorSubject<PizzaOrder[]>([]);

    constructor(
        private http: HttpClient,
        private snackbarService: SnackBarService
    ) {
        this.pizzaOrders$ = this._pizzaOrders$.asObservable();
    }

    refreshPizzaOrders$(): Observable<void> {
        return this.http.get<PizzaOrder[]>('/api/orders').pipe(
            tap((orders: PizzaOrder[]) => this._pizzaOrders$.next(orders)),
            switchMap(() => EMPTY)
        );
    }

    submitPizzaOrder$(newPizzaOrder: PizzaOrder): Observable<void> {
        return this.http.post<PizzaOrder>('/api/orders', newPizzaOrder).pipe(
            tap((pizzaOrder: PizzaOrder): void => this.snackbarService.displayConfirmationSnackBar(`Order ${pizzaOrder.Order_ID} successfully created!`)),
            switchMap((): Observable<void> => this.refreshPizzaOrders$()),
            catchError((error: HttpErrorResponse): Observable<void> => {
                this.snackbarService.displayErrorSnackBar(`${error.status === 409 ? error.error.detail : 'An error occurred creating the order.'}`);
                return of();
            })
        );
    }
}

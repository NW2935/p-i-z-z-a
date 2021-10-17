import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PizzaOrder } from '../models/pizza-order';

@Injectable({
    providedIn: 'root',
})
export class PizzaService {
    public pizzaOrders$: Observable<PizzaOrder[]>;

    private _pizzaOrders$ =  new Subject<PizzaOrder[]>();

    constructor(private http: HttpClient) {
        this.pizzaOrders$ = this._pizzaOrders$.asObservable();
    }

    getPizzaOrders$(): Observable<never> {
        return this.http.get<PizzaOrder[]>('/api/orders').pipe(
            tap((orders: PizzaOrder[]) => this._pizzaOrders$.next(orders)),
            switchMap(() => EMPTY),
        );
    }
}

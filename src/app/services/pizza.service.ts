import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PizzaOrder } from '../models/pizza-order';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PizzaService {
    public pizzaOrders$: Observable<PizzaOrder[]>;

    private _pizzaOrders$ =  new BehaviorSubject<PizzaOrder[]>([]);

    constructor(private http: HttpClient) {
        this.pizzaOrders$ = this._pizzaOrders$.asObservable();
    }

    getPizzaOrders$(): Observable<never> {
        return this.http.get<PizzaOrder[]>('/api/orders').pipe(
            tap((orders: PizzaOrder[]) => this._pizzaOrders$.next(orders)),
            switchMap(() => EMPTY)
        );
    }
}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
/**
 * This interceptor is used to mock back end responses for the purposes of testing the PizzaService.
 */
export class PizzaMockBackEndInterceptor implements HttpInterceptor {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, body } = request;

        if (url.endsWith('/api/orders') && method === 'GET') {
            return of(new HttpResponse({ status: 200, body: { orders: [{ crust: 'test' }] } }));
        } else if (url.endsWith('/api/orders') && method === 'POST') {
            if (body.Flavor === 'test') {
                return of(new HttpResponse({ status: 200, body: { Size: 'test', Crust: 'test', Flavor: 'test', Table_No: 10, Order_ID: 10 } }));
            } else {
                return throwError({ status: 409, error: { } });
            }
        } else if (url.includes('/api/orders') && method === 'DELETE') {
            if (url.endsWith('/10')) {
                return of(new HttpResponse({ status: 200 }));
            } else {
                return throwError({ status: 404, error: { } });
            }
        } else {
            return next.handle(request);
        }
    }
}

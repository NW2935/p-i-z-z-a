import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = localStorage.getItem('access_token');

        if (accessToken) {
            const requestWithAuthHeader = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + accessToken)
            });
            return next.handle(requestWithAuthHeader);
        } else {
            return next.handle(request);
        }
    }
}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
/**
 * This interceptor is used to mock back end responses for the purposes of testing AuthenticationService.
 */
export class AuthenticationMockBackEndInterceptor implements HttpInterceptor {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, body } = request;

        if (url.endsWith('/api/auth')) {
            const { username, password } = body;
            if (username === 'test' && password === 'test') {
                return of(new HttpResponse({ status: 200, body: { access_token: 'success' } }));
            } else {
                return of(new HttpResponse({ status: 401 }));
            }
        } else {
            return next.handle(request);
        }
    }
}

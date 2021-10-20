import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/snack-bar.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
/**
 * This interceptor is used by the application to ensure that the authorization token stored
 * when the user logged in is appended to all requests if it is present.
 */
export class AccessTokenInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private snackbarService: SnackBarService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = localStorage.getItem('access_token');

        if (accessToken && this.authenticationService.isAuthenticated()) {
            const requestWithAuthHeader = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + accessToken)
            });
            return next.handle(requestWithAuthHeader);
        } else  if (request.url.endsWith('/auth')) {
            return next.handle(request);
        } else {
            // if the token isn't present or has expired, we should display a notice to the user and route to the login page
            this.router.navigate(['/login']);
            this.snackbarService.displayErrorSnackBar('Your login session has expired. Please login and try again.');
            return of();
        }
    }
}

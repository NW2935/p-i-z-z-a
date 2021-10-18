import { Injectable } from '@angular/core';
import { SnackBarService } from './snack-bar.service';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    // set keep alive for 1 hour
    private keepAliveMs = 3600000;

    constructor(
        private http: HttpClient,
        private snackbarService: SnackBarService
    ) { }

    public authenticate$(username: string, password: string): Observable<boolean> {      
        return this.http.post('/api/auth', { username, password }).pipe(
            tap((response: any): void => this.setSession(response)),
            catchError((error: HttpErrorResponse): Observable<boolean> => {
                this.snackbarService.displayErrorSnackBar(`${error.status === 401 ? 'Invalid username or password.' : 'Login failed.'}`);
                return of(false);
            })
        );
    }

    public isAuthenticated(): boolean {
        return Date.now() < this.getExpiration();
    }

    public deauthenticate(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_at');
    }

    private getExpiration(): number {
        const expiration = localStorage.getItem('expires_at');
        return parseInt(expiration || '');
    }

    private setSession(authResult: any): void {
        localStorage.setItem('access_token', authResult.access_token as string);
        localStorage.setItem('expires_at', JSON.stringify(Date.now() + this.keepAliveMs) );
    } 
}

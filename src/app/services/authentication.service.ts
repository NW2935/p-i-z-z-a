import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public accessToken$: Observable<string>;

    private _accessToken$ = new BehaviorSubject<string>('');

    constructor(private http: HttpClient) {
        this.accessToken$ = this._accessToken$.asObservable();
    }

    authenticate$(username: string, password: string): Observable<boolean> {      
        return this.http.post('/api/auth', { username, password }).pipe(
            tap((response: any) => this._accessToken$.next(response.access_token)),
            switchMap(() => of(true)),
            catchError((error: HttpErrorResponse) => {
                this._accessToken$.next('');
                const errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                console.log(errorMessage);
                return of(false);
            })
        );
    }

    deauthenticate(): void {
        this._accessToken$.next('');
    }
}

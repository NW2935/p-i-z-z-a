import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, ReplaySubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public accessToken$: Observable<string>;

    private _accessToken$ = new ReplaySubject<string>(1);

    constructor(private http: HttpClient) {
        this.accessToken$ = this._accessToken$.asObservable();
    }

    authenticate$(username: string, password: string): Observable<never> {      
        return this.http.post('/api/auth', { username, password }).pipe(
            tap((response: any) => this._accessToken$.next(response.access_token)),
            switchMap(() => EMPTY)
        );
    }

    deauthenticate(): void {
        this._accessToken$.next('');
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, ReplaySubject, EMPTY } from 'rxjs';

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
        return this.http.post('/api/auth', { username, password}).pipe(
            tap((response: any) => this._accessToken$.next(response.access_token)),
            switchMap(() => EMPTY)
        );
    }
}

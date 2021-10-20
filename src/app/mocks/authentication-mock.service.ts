import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationMockService {
    // set keep alive for 1 hour
    private keepAliveMs = 3600000;

    public authenticate$(username: string, password: string): Observable<boolean> {      
        if (username === 'test' && password === 'test') {
            this.setSession({ access_token: 'test-access-token' });
            return of(true);
        } else {
            return of(false);
        }
    }

    public isAuthenticated(): boolean {
        return Date.now() < this.getExpiration();
    }

    public deauthenticate(): void {
        localStorage.removeItem('access_token_mock');
        localStorage.removeItem('expires_at_mock');
    }

    private getExpiration(): number {
        const expiration = localStorage.getItem('expires_at_mock');
        return parseInt(expiration || '');
    }

    private setSession(authResult: any): void {
        localStorage.setItem('access_token_mock', authResult.access_token as string);
        localStorage.setItem('expires_at_mock', JSON.stringify(Date.now() + this.keepAliveMs) );
    } 
}

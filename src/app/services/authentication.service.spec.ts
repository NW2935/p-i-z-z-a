import { AuthenticationMockBackEndInterceptor } from '../mocks/authentication-mock-backend.interceptor';
import { AuthenticationService } from './authentication.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SnackBarService } from './snack-bar.service';
import { TestBed } from '@angular/core/testing';

describe('AuthenticationService', (): void => {
    let authenticationService: AuthenticationService;

    beforeEach((): void => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                HttpClientTestingModule,
                MatSnackBarModule
            ],
            providers: [
                { provide: HTTP_INTERCEPTORS, useClass: AuthenticationMockBackEndInterceptor, multi: true }
            ]
        });
        authenticationService = TestBed.inject(AuthenticationService);
    });

    afterEach((): void => {
        authenticationService.deauthenticate();
    });

    it('should be created', (): void => {
        expect(authenticationService).toBeTruthy();
    });

    it('should set jwt token when login request succeeds', (): void => {
        const subscribeSpy = jasmine.createSpy();
        authenticationService.authenticate$('test', 'test').subscribe(subscribeSpy);
        const accessToken = localStorage.getItem('access_token');

        expect(subscribeSpy).toHaveBeenCalledWith({ access_token: 'success' });
        expect(accessToken).toBe('success');
    });

    it('should display an error when login request fails', (): void => {
        const subscribeSpy = jasmine.createSpy();
        const snackbarSpy = spyOn(TestBed.inject(SnackBarService), 'displayErrorSnackBar').and.callThrough();
        authenticationService.authenticate$('invalid', 'invalid').subscribe(subscribeSpy);
        const accessToken = localStorage.getItem('access_token');

        expect(subscribeSpy).toHaveBeenCalledWith(false);
        expect(accessToken).toBeNull();
        expect(snackbarSpy).toHaveBeenCalled();
    });

    it('should be authenticated if jwt token is present and hasn\'t expired', (): void => {
        authenticationService.authenticate$('test', 'test').subscribe();
        expect(authenticationService.isAuthenticated()).toBeTrue();
    });

    it('should not be authenticated if jwt token is present and has expired', (): void => {
        authenticationService.authenticate$('test', 'test').subscribe();
        localStorage.setItem('expires_at', JSON.stringify(Date.now() - 100000000) );
        expect(authenticationService.isAuthenticated()).toBeFalse();
    });

    it('should not be authenticated if jwt token is not present', (): void => {
        expect(authenticationService.isAuthenticated()).toBeFalse();
    });
});

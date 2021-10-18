import { AuthGuard } from './auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

describe('AuthGuard', (): void => {
    let guard: AuthGuard;

    beforeEach((): void => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                MatSnackBarModule
            ]
        });
        guard = TestBed.inject(AuthGuard);
    });

    it('should be created', (): void => {
        expect(guard).toBeTruthy();
    });
});

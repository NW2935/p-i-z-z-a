import { AuthGuard } from './auth.guard';
import { TestBed } from '@angular/core/testing';

describe('AuthGuard', (): void => {
    let guard: AuthGuard;

    beforeEach((): void => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(AuthGuard);
    });

    it('should be created', (): void => {
        expect(guard).toBeTruthy();
    });
});

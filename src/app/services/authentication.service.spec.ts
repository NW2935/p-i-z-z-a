import { AuthenticationService } from './authentication.service';
import { TestBed } from '@angular/core/testing';

describe('AuthenticationService', (): void => {
    let service: AuthenticationService;

    beforeEach((): void => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthenticationService);
    });

    it('should be created', (): void => {
        expect(service).toBeTruthy();
    });
});

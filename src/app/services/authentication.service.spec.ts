import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TestBed } from '@angular/core/testing';

describe('AuthenticationService', (): void => {
    let service: AuthenticationService;

    beforeEach((): void => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatSnackBarModule
            ]
        });
        service = TestBed.inject(AuthenticationService);
    });

    it('should be created', (): void => {
        expect(service).toBeTruthy();
    });
});

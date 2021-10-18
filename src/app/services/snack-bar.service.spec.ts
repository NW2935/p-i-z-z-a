import { SnackBarService } from './snack-bar.service';
import { TestBed } from '@angular/core/testing';


describe('SnackBarService', (): void => {
    let service: SnackBarService;

    beforeEach((): void => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SnackBarService);
    });

    it('should be created', (): void => {
        expect(service).toBeTruthy();
    });
});

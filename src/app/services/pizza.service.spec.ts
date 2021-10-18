import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PizzaService } from './pizza.service';
import { TestBed } from '@angular/core/testing';


describe('PizzaService', (): void => {
    let service: PizzaService;

    beforeEach((): void => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatSnackBarModule
            ]
        });
        service = TestBed.inject(PizzaService);
    });

    it('should be created', (): void => {
        expect(service).toBeTruthy();
    });
});

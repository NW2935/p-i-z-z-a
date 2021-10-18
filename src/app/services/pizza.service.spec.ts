import { PizzaService } from './pizza.service';
import { TestBed } from '@angular/core/testing';


describe('PizzaService', (): void => {
    let service: PizzaService;

    beforeEach((): void => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PizzaService);
    });

    it('should be created', (): void => {
        expect(service).toBeTruthy();
    });
});

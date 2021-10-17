import { PizzaService } from './pizza.service';
import { TestBed } from '@angular/core/testing';


describe('PizzaService', () => {
    let service: PizzaService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PizzaService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

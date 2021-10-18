import { LoginComponent } from './login.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('LoginComponent', (): void => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            declarations: [ LoginComponent ]
        })
            .compileComponents();
    });

    beforeEach((): void => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', (): void => {
        expect(component).toBeTruthy();
    });
});

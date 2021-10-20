import { AuthenticationMockService } from 'src/app/mocks/authentication-mock.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { LoginPageObject } from 'src/app/page-objects/login.pageobject';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('LoginComponent', (): void => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let router: Router;
    let pageObject: LoginPageObject;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                HttpClientTestingModule,
                RouterTestingModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatSnackBarModule
            ],
            declarations: [ LoginComponent ],
            providers: [
                { provide: AuthenticationService, useClass: AuthenticationMockService }
            ]
        });

        router = TestBed.inject(Router);
    });

    beforeEach((): void => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        pageObject = new LoginPageObject(fixture);
        fixture.detectChanges();
    });

    it('should create', (): void => {
        expect(component).toBeTruthy();
    });

    it('should navigate to /dashboard if login succeeds', (): void => {
        const spy = spyOn(router, 'navigate');
        pageObject.login('test', 'test');
        expect(spy).toHaveBeenCalledWith(['/dashboard']);
    });

    it('should not navigate if login fails', (): void => {
        const spy = spyOn(router, 'navigate');
        pageObject.login('invalid', 'invalid');
        expect(spy).not.toHaveBeenCalled();
    });
});

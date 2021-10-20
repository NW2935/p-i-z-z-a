import { AuthenticationService } from 'src/app/services/authentication.service';
import { HeaderComponent } from './header.component';
import { HeaderPageObject } from 'src/app/page-objects/header.pageobject';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('HeaderComponent', (): void => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let pageObject: HeaderPageObject;

    let initializeHeaderWithAuth = (isAuthenticated: boolean = true): void => {
        spyOn(TestBed.inject(AuthenticationService), 'isAuthenticated').and.returnValue(isAuthenticated);
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        pageObject = new HeaderPageObject(fixture);
        fixture.detectChanges();
    };

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                MatSnackBarModule
            ],
            declarations: [ HeaderComponent ]
        });
    });

    it('should create', (): void => {
        initializeHeaderWithAuth();
        expect(component).toBeTruthy();
    });

    it('should display logout button if user is authenticated', (): void => {
        initializeHeaderWithAuth();
        expect(pageObject.isLogoutButtonVisible()).toBeTrue();
    });

    it('should not display logout buttin if user is not authenticated', (): void => {
        initializeHeaderWithAuth(false);
        expect(pageObject.isLogoutButtonVisible()).toBeFalse();
    });

    it('should navigate to /login if logout button is clicked', (): void => {
        const spy = spyOn(TestBed.inject(Router), 'navigate');
        initializeHeaderWithAuth();
        pageObject.clickLogoutButton();
        expect(spy).toHaveBeenCalledWith(['/login']);
    });
});

import { ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from '../components/login/login.component';

/**
 * Page object for testing the LoginComponent.
 */
export class LoginPageObject {
    component: LoginComponent;

    constructor(fixture: ComponentFixture<LoginComponent>) {
        this.component = fixture.componentInstance;
    }

    login(username: string, password: string): void {
        this.component.loginForm.controls.username.setValue(username);
        this.component.loginForm.controls.password.setValue(password);
        this.component.onLoginClick();
    }
}
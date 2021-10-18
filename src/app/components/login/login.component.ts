import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public loginForm: FormGroup;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onLoginClick(): void {
        const loginInfo = this.loginForm.value;
        this.authenticationService.authenticate$(
            loginInfo.username as string,
            loginInfo.password as string
        ).subscribe((loginSuccess: boolean): void => {
            if (loginSuccess) {
                this.router.navigate(['/dashboard']);
            }
        });
    }
}

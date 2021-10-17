import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';
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
        private formBuilder: FormBuilder,
        private snackbarService: SnackBarService
    ) {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onLoginClick(): void {
        const loginInfo = this.loginForm.getRawValue();
        this.authenticationService.authenticate$(loginInfo.username, loginInfo.password).subscribe((loginSuccess: boolean) => {
            if (loginSuccess) {
                this.router.navigate(['/dashboard']);
            } else {
                this.snackbarService.displayErrorSnackBar('Login failed.');
            }
        });
    }
}

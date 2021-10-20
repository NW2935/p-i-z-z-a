import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
/**
 * This component is displayed when a user is not authenticated, allowing them to log in.
 */
export class LoginComponent implements OnDestroy {
    public loginForm: FormGroup;
    private subscription = new Subscription();

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
        this.subscription.add(this.authenticationService.authenticate$(
            loginInfo.username as string,
            loginInfo.password as string
        ).subscribe((loginSuccess: boolean): void => {
            if (loginSuccess) {
                this.router.navigate(['/dashboard']);
            }
        }));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

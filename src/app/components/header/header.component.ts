import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
/**
 * This component serves as a top-level header for the application, and provides a logout button
 * if the user is authenticated.
 */
export class HeaderComponent {
    constructor(
        public authenticationService: AuthenticationService,
        private router: Router
    ) { }

    onLogoutClick(): void {
        this.authenticationService.deauthenticate();
        this.router.navigate(['/login']);
    }
}

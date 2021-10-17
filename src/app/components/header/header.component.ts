import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    constructor(
        public authenticationService: AuthenticationService,
        private router: Router
    ) { }

    onLogoutClick() {
        this.authenticationService.deauthenticate();
        this.router.navigate(['/login']);
    }
}

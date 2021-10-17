import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    constructor(
        public authenticationService: AuthenticationService
    ) { }

    onLogoutClick() {
        this.authenticationService.deauthenticate();
    }
}

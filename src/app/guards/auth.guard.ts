import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const targetRoute = route.routeConfig?.path;

        if (this.authenticationService.isAuthenticated() && targetRoute === 'login') {
            this.router.navigate(['']);
            return false;
        } else if (!this.authenticationService.isAuthenticated() && targetRoute !== 'login') {
            this.router.navigate(['/login']);
            return false;
        } else {
            return true;
        }
    }
}

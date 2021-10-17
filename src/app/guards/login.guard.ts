import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authenticationService.accessToken$.pipe(
            switchMap((accessToken: string) => {
                if (accessToken) {
                    this.router.navigate(['/dashboard']);
                    return of(false);
                } else {
                    return of(true);
                }
            })
        );
    }
}

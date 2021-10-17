import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authenticationService.accessToken$.pipe(
            switchMap((accessToken: string) => {
                if (accessToken) {
                    return of(true);
                } else {
                    this.router.navigate(['/login']);
                    return of(false);
                }
            })
        );
    }
}

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { AuthService } from '../_services/auth.services';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.authenticationService.isAuth()){
            return true;
        }else{
            this.router.navigate(['/login']);
        }
    }

    canLoad(route: Route){
        if(this.authenticationService.isAuth()){
            return true;
        }else{
            this.router.navigate(['/login']);
        }
    }
}
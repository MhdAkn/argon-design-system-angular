import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthServices } from './auth-services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private auth:AuthServices,private router: Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.auth.isAuthenticated();
    if (token) {
      return true;
    } else {
      window.location.href='/login';
      return false;
    }
  }
}

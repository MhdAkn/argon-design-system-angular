import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthServices } from "../auth/services/auth-services.service";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class AccountResolver implements Resolve<User> {
    /**
     * Constructor
     */
    constructor(private authService: AuthServices,) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        return this.authService.getMe()
    }
}

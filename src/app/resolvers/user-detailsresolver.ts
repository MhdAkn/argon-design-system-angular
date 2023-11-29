import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthServices } from "../auth/services/auth-services.service";
import { User } from "../models/user";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn: 'root'
})
export class UserDetailResolver implements Resolve<User> {
    /**
     * Constructor
     */
    constructor(private authService: UserService,) {
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
        return this.authService.getUserById({ pseudo: route.params.pseudo })
    }
}

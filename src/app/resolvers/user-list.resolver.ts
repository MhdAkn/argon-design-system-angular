import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";
import { ApiResponse } from "../response/api-response";

@Injectable({
    providedIn: 'root'
})
export class UsersListResolver implements Resolve<ApiResponse> {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ApiResponse> {
        return this.authService.getAllUser()
    }
}

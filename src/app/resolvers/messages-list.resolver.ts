import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UtilsService } from "../utils/utils.service";
import { ApiResponse } from "../response/api-response";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn: 'root'
})
export class MessagesListResolver implements Resolve<ApiResponse> {
    /**
     * Constructor
     */
    constructor(private noteService: UserService, private _utilsService: UtilsService,
    ) {
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
        let user = this._utilsService.READ_LOCAL_ENCODE(localStorage.CURRENT_USER);
        return this.noteService.getAllMessages(undefined)
    }
}

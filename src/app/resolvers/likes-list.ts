import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UtilsService } from "../utils/utils.service";
import { ApiResponse } from "../response/api-response";
import { LikeService } from "../services/like.service";

@Injectable({
    providedIn: 'root'
})
export class LikesListesByUsersResolver implements Resolve<ApiResponse> {
    /**
     * Constructor
     */
    constructor(private likeService: LikeService, private _utilsService: UtilsService,
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
        console.log(user);
        
        return this.likeService.getAllUserLike({ userId: user.id })
    }
}

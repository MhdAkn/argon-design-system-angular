import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { NoteService } from "../services/note.service";
import { UtilsService } from "../utils/utils.service";
import { ApiResponse } from "../response/api-response";

@Injectable({
    providedIn: 'root'
})
export class NotesListesByUsersResolver implements Resolve<ApiResponse> {
    /**
     * Constructor
     */
    constructor(private noteService: NoteService, private _utilsService: UtilsService,
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

        return this.noteService.getAllNotesByUser({ userId: user ? user.id : undefined })
    }
}

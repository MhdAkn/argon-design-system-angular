import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ApiResponse } from "../response/api-response";


enum LikeRoutes {
    GET_USER_LIKES = "/get-user-likes",
    SAVE_OR_REMOVE_LIKE_NOTE = "/saveRemove-like-note",
}


@Injectable({
    providedIn: 'root'
})

export class LikeService {
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);
    private apiUrl = environment.apiUrl;
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    })

    private options = {
        headers: this.headers
    }

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    getAllUserLike(reqData: { userId: string }): Observable<ApiResponse> {
        return this._httpClient.post<ApiResponse>(`${this.apiUrl}like${LikeRoutes.GET_USER_LIKES}`, { reqData: reqData }, this.options)
    }

    saveOrRemoveLike(reqData: { isLiked: boolean, userId: string, noteId: string }): Observable<ApiResponse> {
        console.log(reqData);
        
        return this._httpClient.post<ApiResponse>(`${this.apiUrl}like${LikeRoutes.SAVE_OR_REMOVE_LIKE_NOTE}`, { reqData: reqData }, this.options)
    }
}
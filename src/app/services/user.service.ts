import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ApiResponse } from "../response/api-response";
import { UserLogin, UserRegistration } from "../playloads/userRegistration.playload";


enum UserRoutes {
    GET_ALL_USERS = '/get-allUsers',
    GET_USER_BY_ID = '/get_user'
}


@Injectable({
    providedIn: 'root'
})

export class UserService {
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

    getAllUser(): Observable<ApiResponse> {
        return this._httpClient.post<ApiResponse>(`${this.apiUrl}user${UserRoutes.GET_ALL_USERS}`, { reqData: undefined }, this.options)
    }
    
    getUserById(reqData: { userId: string }): Observable<ApiResponse> {
        return this._httpClient.post<ApiResponse>(`${this.apiUrl}auth${UserRoutes.GET_USER_BY_ID}`, { reqData: reqData }, this.options)
    }
}
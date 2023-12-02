import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ApiResponse } from "../response/api-response";
import { User } from "../models/user";


enum UserRoutes {
    GET_ALL_USERS = '/get-allUsers',
    GET_USER_BY_ID = '/get_user',
    UPDATE_USER = '/update-user',
    SEND_MESSAGE = '/send-message',
    GET_MESSAGES = "/get-all-messages",
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

    getUserById(reqData: { pseudo: string }): Observable<User> {
        return this._httpClient.post<User>(`${this.apiUrl}user${UserRoutes.GET_USER_BY_ID}`, { reqData: reqData }, this.options)
    }

    updateUser(reqData: { user: User }): Observable<ApiResponse> {
        return this._httpClient.post<ApiResponse>(`${this.apiUrl}user${UserRoutes.UPDATE_USER}`, { reqData: reqData }, this.options)
    }

    sendMessage(reqData: { pseudo: string, email: string, message: string }): Observable<ApiResponse> {
        return this._httpClient.post<ApiResponse>(`${this.apiUrl}user${UserRoutes.SEND_MESSAGE}`, { reqData: reqData }, this.options)
    }

    getAllMessages(reqData: { userId: string },): Observable<ApiResponse> {
        return this._httpClient.post<ApiResponse>(`${this.apiUrl}user${UserRoutes.GET_MESSAGES}`, { reqData: reqData }, this.options)
    }
}
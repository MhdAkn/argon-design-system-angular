import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ApiResponse } from "../response/api-response";
import { NewNotePlayload } from "../playloads/note.playload";


enum NoteRoutes {
    GET_USER_NOTES = "/get-user-notes",
    GET_DETAIL_NOTE = "/get-detail-note",
    GET_NEWS = "/get-all-news",
    CREATE_NOTE = "/new-note",
    UPDATE_NOTE = "/update-note",
    DELETE_NOTE = "/delete-note",
}


@Injectable({
    providedIn: 'root'
})

export class NoteService {
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

    getAllNews(reqData: { userId: string },): Observable<ApiResponse> {
        return this._httpClient.post<ApiResponse>(`${this.apiUrl}note${NoteRoutes.GET_NEWS}`, { reqData: reqData }, this.options)
    }

  
    getNoteDetail(reqData: { noteId: string }): Observable<ApiResponse> {
        return this._httpClient.post<ApiResponse>(`${this.apiUrl}note${NoteRoutes.GET_DETAIL_NOTE}`, { reqData: reqData }, this.options)
    }

    getAllNotesByUser(reqData: { userId: string }): Observable<ApiResponse> {
        return this._httpClient.post<ApiResponse>(`${this.apiUrl}note${NoteRoutes.GET_USER_NOTES}`, { reqData: reqData }, this.options)
    }

    addNote(reqData: { note: NewNotePlayload, userId: string }): Observable<ApiResponse> {
        console.log(reqData);
        return this._httpClient.post<ApiResponse>(`${this.apiUrl}note${NoteRoutes.CREATE_NOTE}`, { reqData: reqData }, this.options)
    }

    updateNote(reqData: { note: NewNotePlayload, userId: string }): Observable<ApiResponse> {
        console.log(reqData);
        return this._httpClient.post<ApiResponse>(`${this.apiUrl}note${NoteRoutes.UPDATE_NOTE}`, { reqData: reqData }, this.options)
    }

    deleteNote(reqData: { noteId: string, userId: string }): Observable<ApiResponse> {
        return this._httpClient.post<ApiResponse>(`${this.apiUrl}note${NoteRoutes.DELETE_NOTE}`, { reqData: reqData }, this.options)
    }
}
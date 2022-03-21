import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { User } from "../models/user.login.model";

@Injectable({
    providedIn: 'any'
})

export class AuthService {
    constructor(private http:HttpClient){}

    private url = 'http://localhost:3000/'

    static logStatus = false
    
    login(){
        let link = this.url + 'users'
        return this.http.get<User[]>(link)
    }
}
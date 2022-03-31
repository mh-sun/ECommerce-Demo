import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'any'
})

export class AuthService {
    constructor(private http:HttpClient){
    }

    private url = 'http://localhost:3000/'
    
    login(){
        let link = this.url + 'users'
        return this.http.get<User[]>(link)
    }

    Registration(user: any){
        let link = this.url + 'users'
        return this.http.post(link, user);
    }

}
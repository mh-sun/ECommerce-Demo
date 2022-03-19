import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'any'
})

export class AuthService {
    constructor(private http:HttpClient){}

    private url = 'http://localhost:3000/'
    
    Login(data:object){
        console.log(data)
        let link = this.url + 'users'
        return this.http.post<any>(link, data)
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { User } from "../models/user.login.model";

@Injectable({
    providedIn: 'any'
})

export class AuthService {
    constructor(private http:HttpClient){}

    private url = 'http://localhost:3000/'
    public isLoggedIn = false
    
    Login(){
        let link = this.url + 'users'
        return this.http.get(link)
    }

    Registration(user: any){
        let link = this.url + 'users'
        return this.http.post(link,user);
    }

    getId(){
        let link = this.url + 'users'
        this.http.get(link).subscribe((data: any)=>{
         console.log(data.length)
         return data[data.length-1].id;
       });
       
     }

}
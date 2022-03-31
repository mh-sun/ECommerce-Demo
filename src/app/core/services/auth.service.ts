import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, of } from "rxjs";
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
    getOneUser(id:number){
        let link = this.url + 'users/'+id;
      return this.http.get<User>(link).pipe(map((res:any)=>{
        return res;
      }))
    }

    // getId(){
    //     let link = this.url + 'users'
    //     this.http.get(link).subscribe((data: any)=>{
    //      console.log(data.length)
    //      return data[data.length-1].id;
    //    });
       
    //  }

}
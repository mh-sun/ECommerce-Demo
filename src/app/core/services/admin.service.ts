import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import {orderAdmin } from "../models/admin.model";
@Injectable({
    providedIn: 'any'
})
export class AdminService{
    constructor(private http:HttpClient){
    }

    private url = 'http://localhost:3000/admin';

    getOrders(){
        return this.http.get<any>(this.url);
    }
    getOrderDetails(){
        return this.http.get<any>(this.url).pipe(map(res=>{
            
            res = res.order;
        }))
    }
}
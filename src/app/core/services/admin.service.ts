import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Admin } from "../models/admin.model";
import { Order } from '../models/order.model';
@Injectable({
    providedIn: 'any'
})
export class AdminService{
    constructor(private http:HttpClient){
    }

    private url = 'http://localhost:3000/admin';

    getOrders(){
        return this.http.get<Order[]>(this.url);
    }
}
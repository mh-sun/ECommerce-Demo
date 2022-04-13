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

    private url = 'http://localhost:3000/adminOrder';
    
    getOrders(){
        return this.http.get<any>(this.url);
    }
    // getOrderDetails(){
    //     return this.http.get<any>(this.url).forEach(res=>{
    //         console.log(res.order)
    //     })
    // }
    updatePost(postData: Object,id:number) {
        const newUrl = this.url+'/'+id;
        this.http.put( newUrl, postData).subscribe(data => {
          console.log(data);
        });
    }
    getOneProduct(id:number){
      const newUrl = this.url+'/'+id;
      return this.http.get<any>(newUrl).pipe(map((res:any)=>{
        return res;
      }))
    }

}
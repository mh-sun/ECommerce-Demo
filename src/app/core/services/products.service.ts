import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url ="https://fakestoreapi.com/products";
  constructor(private http:HttpClient) { }

  getProduct(){
    return this.http.get<any>(this.url)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getOneProduct(id:number){
    const newUrl = this.url+'/'+id;
    return this.http.get<Product>(newUrl).pipe(map((res:any)=>{
      return res;
    }))

  }
}

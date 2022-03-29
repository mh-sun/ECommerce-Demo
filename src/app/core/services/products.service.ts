import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url ="http://localhost:3000/products";
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
  updatePost(postData: Object,id:number) {
    const newUrl = this.url+'/'+id;
    this.http.put( newUrl, postData).subscribe(data => {
      console.log(data);
    });
  }


}

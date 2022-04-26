import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  url ="http://localhost:3000/products";
  constructor(private http:HttpClient) { }

  getProduct(){ 
    return this.http.get<Product[]>(this.url).pipe(map((res:any)=>{
      return res;
    }))
  }
  getOneProduct(id:number){
    const newUrl = this.url+'/'+id;
    return this.http.get<Product>(newUrl).pipe(map((res:any)=>{
      return res;
    }))
  }
  
  updateProduct(postData: Object,id:number) {
    const newUrl = this.url+'/'+id;
    this.http.put( newUrl, postData).subscribe(data => {
      console.log(data);
    });
  }

  addProduct(product:Product){
    console.log(product)
    return this.http.post(this.url, product).subscribe(res=>{
      console.log('res',res)
    });
  }

  upload(formData: FormData) {
    return this.http.post<any>('http://localhost:3000/assets', formData).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
  }
  
  deleteProduct(id:number) {
    const newUrl = this.url+'/'+id;
    this.http.delete(newUrl).subscribe(data => {
      console.log(data);
    });
  }

}

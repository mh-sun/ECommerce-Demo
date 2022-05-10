import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  public url ="http://localhost:3000/products";
  private productPerLoad = 6
  public productCount = 0
  public renderedProductCount = new BehaviorSubject(0)
  constructor(private http:HttpClient) { 
    this.renderedProductCount.subscribe(num=>{
      this.productCount = num
    })
  }

  getProduct(){
    return this.http.get<Product[]>(this.url).pipe(map((res:any)=>{
      return res;
    }))
  }

  getNextProducts(){
    return this.http.get<Product[]>(this.url).pipe(map(res=>{
      if(this.productCount<res.length){
        if(this.productCount+this.productPerLoad < res.length){
          let temp = this.productCount
          this.renderedProductCount.next(this.productCount+this.productPerLoad)
          return res.slice(temp, temp+this.productPerLoad)
        }
        else{
          let temp = this.productCount
          this.renderedProductCount.next(this.productCount+this.productPerLoad)
          return res.slice(temp)
        }
      }
      else return []
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

  productCountReset(){
    this.productCount = 0
  }
}

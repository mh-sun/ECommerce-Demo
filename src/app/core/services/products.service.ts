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
    return this.http.get<any>(this.url)
    .pipe(map((res:any)=>{
      res.forEach((a:any)=>{
        Object.assign(a,{
          quantity:1,
          total:a.price
        });        
        if(a.variation != {} && a.variation != undefined) return res

        if(a.category=='men\'s clothing' || a.category=='women\'s clothing'){
          Object.assign(a,{
            variation:{
              color:['red', 'black', 'yellow'],
              size:['S', 'M', 'L', 'XL'],
            }
          })
        }
        else if(a.category=='jewelery'){
          Object.assign(a,{
            variation:{
              material:['gold', 'silver']
            }
          })
        }
        else {
          Object.assign(a,{
            variation:{}
          })
        }
      })
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
  
  public deletePost(id:number) {
    const newUrl = this.url+'/'+id;
    this.http.delete(newUrl).subscribe(data => {
      console.log(data);
    });
  }

}

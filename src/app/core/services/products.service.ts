import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getProduct(){
    return this.http.get<any>("http://localhost:3000/products")
    .pipe(map((res:any)=>{
      console.log(res);
      res.forEach((a:any)=>{
        Object.assign(a,{
          quantity:1,
          total:a.price
        });

        console.log(a.category);
        
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
}

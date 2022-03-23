import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  private url="https://fakestoreapi.com/"

  getProduct(){
    return this.http.get<any>(this.url+"products")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}

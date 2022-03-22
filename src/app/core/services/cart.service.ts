import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { shipping } from '../models/shipping.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items:Product[] = [];
  private url = 'http://localhost:3000/shipping'
  constructor(private http:HttpClient){

  }

  addToCart(product:Product) {
    this.items.push(product);
  }
  
  getItems(){
    return this.items;
  }
  
  clearCart(){
    this.items = [];
    return this.items;
  }

  getShippingPrice():Observable<shipping[]>{
    return this.http.get<shipping[]>(this.url);
  }

}

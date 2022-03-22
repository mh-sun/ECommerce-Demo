import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  private url='http://localhost:3000/products'

  getProduct():Observable<Product[]>{
    return this.http.get<Product[]>(this.url);
  }
}

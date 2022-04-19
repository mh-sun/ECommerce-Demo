import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public userSubscription: any
  private order!: Order | null
  public currentOrder = new BehaviorSubject<Order | null>(null)
  private url = 'http://localhost:3000/orders';
  constructor(private http: HttpClient) { }

  sendOrder(order: Order) {
    this.currentOrder.next(order)
    this.userSubscription = this.currentOrder.subscribe({
      next: u => {
        this.order = u
        console.log(this.order)
      }
    })
  }

  getOrders() {
    return this.http.get<Order[]>(this.url);
  }

  updatePost(postData: Object, id: number) {
    const newUrl = this.url + '/' + id;
    this.http.put(newUrl, postData).subscribe(data => {
      console.log(data);
    });
  }
  
  getOneProduct(id: number) {
    const newUrl = this.url + '/' + id;
    return this.http.get<any>(newUrl).pipe(map((res: any) => {
      return res;
    }))
  }

}

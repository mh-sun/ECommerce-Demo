import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Order } from '../models/order.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  public userSubscription: any
  public currentOrder = new BehaviorSubject<Order | null>(null)
  private order!: Order | null
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
    console.log('getting orders')
    return this.http.get<Order[]>(this.url);
  }

  updateOrder(postData: Object, id: string) {
    const newUrl = this.url + '/' + id;
    this.http.put(newUrl, postData).subscribe(data => {
      console.log(data);
    });
  }

  getOneOrder(id: string) {
    const newUrl = this.url + '/' + id;
    console.log('getting a single order')
    return this.http.get<any>(newUrl).pipe(map((res: any) => {
      return res;
    }))
  }

  postOrder(order:Order){
    this.http.post<Order>(this.url, order).subscribe({
      next:res=>console.log(res),
      error:err=>console.log(err),
      complete:()=>console.log('complete')
    })
  }

  getUserOrders(ids:string[] = []){
    return this.getOrders().pipe(
      map(orders=>{
        return orders.filter(order=>{
          return ids.indexOf(order.id) !== -1
        })
      })
    )
  }
  deleteOrder(id: string) {
    return this.http.delete(this.url + '/' + id);
  }

}

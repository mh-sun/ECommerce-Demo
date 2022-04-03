import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public userSubscription:any
  private order!:Order|null
  public currentOrder = new BehaviorSubject<Order|null>(null)

  constructor(){}
    
  sendOrder(order:Order) { 
    this.currentOrder.next(order)  
    this.userSubscription = this.currentOrder.subscribe({
      next: u=>{
        this.order = u
        console.log(this.order)
      }
    }) 
  }
}

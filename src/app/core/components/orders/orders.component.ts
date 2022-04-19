import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Order } from '../../models/order.model';
import { User } from '../../models/user.model';
import { LogService } from '../../services/log.service';
import { OrderService } from '../../services/order.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  name = 'Progress Bar';
  user: User|any;
  public counts = ["Payment Pending","Processing","Shipped","Delivered"];
  totalBill=0;
  order:Order|any;
  orderStatusIndex :number = -1
  subscriptionName!: Subscription;
  constructor(
    private service:ProductsService,
    private userService:LogService,
    private route:ActivatedRoute,
    private log:LogService,
    private router:Router,
    private orderService:OrderService
  ) {}
  ngOnInit(): void {
    let orders:Order[]|undefined;
    const routeParams = this.route.snapshot.paramMap;
    let orderId = String(routeParams.get('id'));
    console.log(this.orderStatusIndex)
    this.orderService.currentOrder.subscribe({
      next:order=>{
        console.log(this.orderStatusIndex)
        this.order = order;
        if(order===null) return
        this.orderStatusIndex = this.counts.indexOf(order.status)
        this.totalBill = this.order.payment.shipping+this.order.payment.subtotal;
      }
    })
    this.log.loggedUser.subscribe({
      next:u=>{
        console.log(this.orderStatusIndex)
        this.user = u;
        if(this.order===null){
          orders = u?.orders;
          if(orders!=null){
            for(let order of orders){
              if(order.id==orderId){
                this.order = order;
                this.totalBill = this.order.payment.shipping+this.order.payment.subtotal;
              }
            }
          }
        }
      }
    })
  }
  
}

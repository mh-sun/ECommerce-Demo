import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Order } from '../../models/order.model';
import { User } from '../../models/user.model';
// import { AuthService } from '../../services/auth.service';
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
  public counts = ["Payment Pending","Processing","Shipped",
  "Delivered"];
  public orderStatus = "Delivered";
  totalBill=0;
  order:Order|any;
  subscriptionName!: Subscription;
  constructor(private service:ProductsService,private route:ActivatedRoute,private log:LogService,private orderService:OrderService) {   
  
  }
  ngOnInit(): void {
    let orders:Order[]|undefined;
    const routeParams = this.route.snapshot.paramMap;
    let orderId = String(routeParams.get('id'));
    this.orderService.currentOrder.subscribe({next:order=>{
      this.order = order;
      // console.log(order)
      this.totalBill = this.order.payment.shipping+this.order.payment.subtotal;
    }})
    this.log.loggedUser.subscribe({
      next:u=>{
        this.user = u;
        console.log(this.user);
        console.log(this.order)
        if(this.order==null){
          orders = u?.orders;
              if(orders!=null){
                for(let order of orders){
                  if(order.id==orderId){
                    this.order = order;
                    console.log(this.order);
                    this.totalBill = this.order.payment.shipping+this.order.payment.subtotal;
                  }
                }
              }
        }
      }
    })
  }
  
}

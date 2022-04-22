import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription, takeUntil } from 'rxjs';
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
export class OrdersComponent implements OnInit, OnDestroy{
  public user: User|any;
  public counts = ["Payment Pending","Processing","Shipped","Delivered"];
<<<<<<< HEAD
  public orderStatus = "Delivered";
  totalBill=0;
  order:Order|any;
  subscriptionName!: Subscription;
  constructor(private service:ProductsService,private route:ActivatedRoute,private log:LogService,private orderService:OrderService) {   
=======
  public totalBill=0;
  public order:Order|any;
  public orderStatusIndex :number = -1
  public orderId!:any
  // public subcriptions:Subscription = new Subscription()
  public subOff$ = new Subject()
>>>>>>> mh-sun
  
  constructor(
    private route:ActivatedRoute,
    private log:LogService,
    private orderService:OrderService
  ) {}
  ngOnDestroy(): void {
    // this.subcriptions.unsubscribe()

    this.subOff$.next(1)
    this.subOff$.complete()
  }

  ngOnInit(): void {
    let orders:Order[]|undefined;

    const routeParams = this.route.snapshot.paramMap;
    this.orderId = routeParams.get('id');

    const orderSub = this.orderService.currentOrder
    .pipe(takeUntil(this.subOff$))
    .subscribe({
      next:order=>{
        this.order = order;
        if(order===null) return
        this.orderStatusIndex = this.counts.indexOf(order.status)
        this.totalBill = this.order.payment.shipping+this.order.payment.subtotal;
      }
    })
    // this.subcriptions.add(orderSub)

    const logSub = this.log.loggedUser
    .pipe(takeUntil(this.subOff$))
    .subscribe({
      next:u=>{
        this.user = u;
        console.log(this.order)
        if(this.order===null){
          orders = u?.orders;
          if(orders!=null){
            for(let order of orders){
              if(order.id===this.orderId){
                this.order = order;
                this.orderStatusIndex = this.counts.indexOf(order.status)
                this.totalBill = this.order.payment.shipping+this.order.payment.subtotal;
              }
            }
          }
        }
      }
    })
    // this.subcriptions.add(logSub)
  }
  
}

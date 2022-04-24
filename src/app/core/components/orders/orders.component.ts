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
  public totalBill=0;
  public order:Order|any;
  public orderStatusIndex :number = -1
  public orderId!:any
  public subOff$ = new Subject()
  
  constructor(
    private route:ActivatedRoute,
    private log:LogService,
    private orderService:OrderService
  ) {}
  
  ngOnDestroy(): void {
    this.subOff$.next(1)
    this.subOff$.complete()
  }

  ngOnInit(): void {
    let orders:Order[]|undefined;

    const routeParams = this.route.snapshot.paramMap;
    this.orderId = routeParams.get('id');

    this.orderService.currentOrder
    .pipe(takeUntil(this.subOff$))
    .subscribe({
      next:order=>{
        this.order = order;
        if(order===null) return
        this.orderStatusIndex = this.counts.indexOf(order.status)
        this.totalBill = this.order.payment.shipping+this.order.payment.subtotal;
      }
    })

    this.log.loggedUser
    .pipe(takeUntil(this.subOff$))
    .subscribe({
      next:u=>{
        this.user = u;
        if(this.order===null) this.setOrder()
      }
    })
  }
  setOrder() {
    this.orderService.getOneProduct(this.orderId).subscribe(order=>{
      console.log(order)
      this.order = order
      this.orderStatusIndex = this.counts.indexOf(order.status)
      this.totalBill = this.order.payment.shipping+this.order.payment.subtotal;
    })
  }
  
}

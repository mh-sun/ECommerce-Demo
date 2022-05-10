import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription, takeUntil } from 'rxjs';
import { Order } from '../core/models/order.model';
import { User } from '../core/models/user.model';
import { LogService } from '../core/services/log.service';
import { OrderService } from '../core/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy{
  public user: User|null = null;
  public counts = ["Payment Pending","Processing","Shipped","Delivered"];
  public totalBill=0;
  public order:Order|null = null;
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
    const routeParams = this.route.snapshot.paramMap;
    this.orderId = routeParams.get('id');
    this.route.params.pipe(takeUntil(this.subOff$)).subscribe(res=>{
      this.orderId = res['id']
      this.setOrder()
    })
  }

  setOrder() {
    this.orderService.getOneOrder(this.orderId).pipe(takeUntil(this.subOff$))
    .subscribe((o:Order)=>{
      this.order = o
      if(this.order){
        this.orderStatusIndex = this.counts.indexOf(o.status)
        this.totalBill = this.order.payment.shipping+this.order.payment.subtotal;

        if(this.order.userId){
          this.log.getOneUser(this.order.userId).pipe(takeUntil(this.subOff$)).subscribe({
            next:u=>{
              this.user = u;
            }
          })
        }
      }
    })
  }
  
}

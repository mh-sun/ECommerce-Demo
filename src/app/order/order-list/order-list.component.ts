import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Order } from 'src/app/core/models/order.model';
import { User } from 'src/app/core/models/user.model';
import { LogService } from 'src/app/core/services/log.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit,OnDestroy {

  public orders:Order[] = []
  public subscription = new Subject()
  public user!:User|null

  constructor(
    private orderService:OrderService,
    private logger:LogService
  ) { }

  ngOnInit(): void {
    this.logger.loggedUser.pipe(
      takeUntil(this.subscription)
    ).subscribe(u=>{
      this.user = u
      this.orderService.getUserOrders(this.user?.orders)
      .pipe(takeUntil(this.subscription))
      .subscribe(orders=>{
        for(let i = orders.length-1;i>=0;i--){
          this.orders.push(orders[i])
        }
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription.next(1)
    this.subscription.complete()
  }
}

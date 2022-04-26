import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Order } from '../core/models/order.model';
import { User } from '../core/models/user.model';
import { LogService } from '../core/services/log.service';
import { OrderService } from '../core/services/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {

  public user:User|null  = null
  public orders:Order[] = []
  public subscription = new Subject()

  constructor(
    private logger:LogService,
    private orderService:OrderService,
  ) { }

  ngOnInit(): void {
    this.logger.loggedUser
    .pipe(takeUntil(this.subscription))
    .subscribe(user=>{
      this.user = user

      if(user!==null){
        this.orderService.getUserOrders(user.orders)
        .pipe(takeUntil(this.subscription))
        .subscribe(orders=>{
          let c = 0
          for(let i = orders.length-1;i>=0;i--){
            if(c<3) {
              this.orders.push(orders[i])
              c++
            }
            else break
          }
        })
      }      
    })
  }

  ngOnDestroy(): void {
    this.subscription.next(1)
    this.subscription.complete()
  }
}

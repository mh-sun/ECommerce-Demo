import { AfterViewInit, Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Order } from '../../models/order.model';
import { CartApiService } from '../../services/cart-api.service';
import { LogService } from '../../services/log.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  public logStatus!:boolean
  public cartItemNumber:number|undefined = 0
  public orders: Order[] = [] ;
  // public subcriptions:Subscription = new Subscription();
  public subOff$ = new Subject()

  constructor(
    private cartService:CartApiService,
    private logger:LogService,
    private orderService:OrderService){
    
    const logSub = this.logger.loggedUser
    .pipe(takeUntil(this.subOff$))
    .subscribe({
      next:u=>{
        this.orders = u === null? [] :u?.orders
        this.cartItemNumber = u === null? 0:u?.carts.length
        this.logStatus = u === null? false:true
      }
    })
    // this.subcriptions.add(logSub)
  }

  ngOnInit(): void {
    this.cartItemNumber = this.cartItemNumber===undefined? 0 : this.cartItemNumber
  }
  
  ngOnDestroy(): void {
    // this.subcriptions.unsubscribe()

    this.subOff$.next(1)
    this.subOff$.complete()
  }

  logOut(){
    this.logger.logout()
  }

  sendOrder(order:Order): void {
    this.orderService.sendOrder(order);
  }
}
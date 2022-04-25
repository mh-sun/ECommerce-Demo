import { AfterViewInit, Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Order } from '../../models/order.model';
import { User } from '../../models/user.model';
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
  public subOff$ = new Subject()

  constructor(
    private cartService:CartApiService,
    private logger:LogService,
    private orderService:OrderService){
    
    this.logger.loggedUser
    .pipe(takeUntil(this.subOff$))
    .subscribe({
      next:u=>{
        this.cartItemNumber = u === null? 0:u?.carts.length
        this.logStatus = u === null? false:true
        this.setOrders(u)
      }
    })
  }

  setOrders(u:User|null) {
    if(u === null) {
      this.orders = []
      return
    }

    this.orderService.getOrders().subscribe(allOrders=>{
      let selectedOrders = allOrders.filter(order=>{
        return u.orders.indexOf(order.id) !== -1
      })
      console.log("Orders of users", selectedOrders)
      this.orders = selectedOrders
    })
  }

  ngOnInit(): void {
    this.cartItemNumber = this.cartItemNumber===undefined? 0 : this.cartItemNumber
  }
  
  ngOnDestroy(): void {
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
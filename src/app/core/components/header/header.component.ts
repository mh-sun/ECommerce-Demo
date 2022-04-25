import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public subOff$ = new Subject()

  constructor(
    private cartService:CartApiService,
    private logger:LogService,
    private orderService:OrderService,
    private router:Router){
    
    this.logger.loggedUser
    .pipe(takeUntil(this.subOff$))
    .subscribe({
      next:u=>{
        this.cartItemNumber = u === null? 0:u?.carts.length
        this.logStatus = u === null? false:true
      }
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
  
  trackOrder(id:string){
    this.router.navigate(['/order',id])
  }

  setElemActive(elem:HTMLElement){
    console.log(typeof elem)
    console.log(elem)
    elem.classList.contains('dropdown-active')?
      elem.classList.remove('dropdown-active'):
      elem.classList.add('dropdown-active')
  }
}
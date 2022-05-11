import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Order } from '../../models/order.model';
import { User } from '../../models/user.model';
import { CartApiService } from '../../services/cart-api.service';
import { LogService } from '../../services/log.service';
import { OrderService } from '../../services/order.service';
import { SearchProductsService } from '../../services/search-products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  public logStatus!:boolean
  public cartItemNumber:number|undefined = 0
  public searchKey:string = ''
  public subOff$ = new Subject()

  constructor(
    private cartService:CartApiService,
    private logger:LogService,
    private orderService:OrderService,
    private searchedKeywdSurvice:SearchProductsService,
    private router:Router){
    
    this.logger.loggedUser
    .pipe(takeUntil(this.subOff$))
    .subscribe({
      next:u=>{
        this.logStatus = u === null? false:true
      },
      error:err=>{
        console.log(err)
      }
    })
    this.cartService.cartSubject.pipe(takeUntil(this.subOff$)).subscribe({
      next:carts=>{
        this.cartItemNumber = carts.length
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
    this.router.navigate(['/'])
  }

  sendOrder(order:Order): void {
    this.orderService.sendOrder(order);
  }
  
  trackOrder(id:string){
    this.router.navigate(['/order',id])
  }

  setElemActive(elem:HTMLElement){
      elem.classList.add('dropdown-active')
  }

  setElemInactive(elem:HTMLElement){
    elem.classList.remove('dropdown-active')

  }

  searchProduct(){
    this.searchedKeywdSurvice.keyword$.next(this.searchKey)
  }

  resetKey(){
    this.searchKey = ''
    this.searchProduct()
  }

}
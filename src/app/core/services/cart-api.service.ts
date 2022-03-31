import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user.model';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class CartApiService{

  private user!:User|null

  constructor(private logger:LogService) {
    this.logger.loggedUser.subscribe({
      next: u=>{
        this.user = u
        // console.log(this.user)
      }
    })
  }
  
  addToCart(product : any){
    this.user?.cart.push(product)
    // console.log(this.user);
    this.logger.loggedUser.next(this.user)
    this.logger.storeUser
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.user?.cart.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }

  removeCartItem(product: any){
    this.user?.cart.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.user?.cart.splice(index,1);
        this.logger.loggedUser.next(this.user)
        this.logger.storeUser()
      }
    })
  }

  clearCart(){
    this.user?.cart.splice(0,this.user.cart.length)
    this.logger.loggedUser.next(this.user)
    this.logger.storeUser()
  }
}
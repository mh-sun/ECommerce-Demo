import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user.model';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  private user!:User|null
  private cartItemList : any =[]
  private productList = new BehaviorSubject<any>([]);

  constructor(private logger:LogService) {
    logger.loggedUser.subscribe({
      next: u=>{
        this.user = u
        this.productList.next(u?.cart)
        this.cartItemList = u?.cart
      }
    })
  }

  getProducts(){
    return this.productList.asObservable();
  }

  getCartItemList(){
    return this.cartItemList
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  
  addToCart(product : any){
    console.log('add to cart called')
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    if(this.user !== null){
      this.user.cart.push(product)
      this.logger.loggedUser.next(this.user)
      this.logger.storeUser()
    }
    
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }

  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
        if(this.user !== null){
          this.user.cart.splice(product)
          this.logger.loggedUser.next(this.user)
          this.logger.storeUser()
        }
      }
    })
    this.productList.next(this.cartItemList);
  }

  clearCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
    if(this.user !== null){
      this.user.cart = []
      this.logger.loggedUser.next(this.user)
      this.logger.storeUser()
    }
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CartProduct } from '../models/cart-product.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { LogService } from './log.service';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartApiService{

  private user!:User|null
  public cartProducts:CartProduct[] = []

  constructor(
    private logger:LogService,
    private productApi:ProductsService) {
    this.logger.loggedUser.subscribe({
      next: u=>{
        this.user = u

        this.user?.cart.forEach((element:any) => {
          this.productApi.getOneProduct(element.productId).subscribe(res=>{
            let resProduct:CartProduct = {
              product : res,
              quantity: element.quantity,
              variation: element.variation
            }
            this.cartProducts.push(resProduct)            
          })
        });
      }
    })
  }

  addToCart(product : any){
    this.user?.cart.push(product)
    this.logger.loggedUser.next(this.user)
    this.logger.storeUser(this.user)
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartProducts.forEach(c=>{
      grandTotal += (c.product.price*c.quantity)
    })
    return grandTotal;
  }

  removeCartItem(product: any){
    this.user?.cart.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.user?.cart.splice(index,1);
        this.logger.loggedUser.next(this.user)
        this.logger.storeUser(this.user)
      }
    })
  }

  clearCart(){
    this.user?.cart.splice(0,this.user.cart.length)
    this.logger.loggedUser.next(this.user)
    this.logger.storeUser(this.user)
  }
}
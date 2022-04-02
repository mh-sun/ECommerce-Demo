import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { LogService } from './log.service';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartApiService{

  private user!:User|null
  public products:Product[] = []

  constructor(
    private logger:LogService,
    private productApi:ProductsService) {
    this.logger.loggedUser.subscribe({
      next: u=>{
        this.user = u

        this.user?.cart.forEach((element:any) => {
          this.productApi.getOneProduct(element.productId).subscribe(res=>{
            if(!(res in this.products)){
              this.products.push(res)
            }
            console.log(this.products);
            
          })
        });
      }
    })
  }
  
  addToCart(product : any){
    this.user?.cart.push(product)
    this.logger.loggedUser.next(this.user)
    this.logger.storeUser
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.user?.cart.map((a:any)=>{
      console.log(a.quantity);
      
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
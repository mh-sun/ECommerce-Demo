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
  public grandTotal = new BehaviorSubject<number>(0)
  constructor(
    private logger:LogService,
    private productApi:ProductsService) {

    this.logger.loggedUser.subscribe({
      next: u=>{
        this.user = u
        console.log(111111111111)
        this.grandTotalPrice()
        this.getProducts()
      }
    })
  }
  grandTotalPrice() {
    let grandTotal = 0;
    this.cartProducts.forEach(c=>{
      grandTotal += (c.product.price*c.quantity)
    })
    console.log(this.cartProducts)
    this.grandTotal.next(grandTotal)
  }
  getProducts(){
    this.cartProducts = []
    this.user?.cart.forEach(item=>{
      this.addToCartProduct(item)
    })
    return this.cartProducts
  }

  addToCartProduct(element:any){
    this.productApi.getOneProduct(element.productId).subscribe(res=>{
      let resProduct:CartProduct = {
        product : res,
        quantity: element.quantity,
        variation: element.variation
      }
      this.cartProducts.push(resProduct)
    })
  }

  addToCart(product : any){
    let flag = true
    this.user?.cart.map((a:any, index:number)=>{
      if(product.productId === a.productId){
        flag = false
        if(this.isEqualObject(product.variation, a.variation)){
          this.user!.cart[index].quantity += product.quantity
          this.cartProducts[index].quantity += product.quantity
        }
        else flag = true
      }
    })
    if(flag) this.user?.cart.push(product)
    this.logger.loggedUser.next(this.user)
    this.logger.storeUser(this.user)
  }

  isEqualObject(object1:any, object2:any):boolean{
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      if (val1 !== val2) {
        return false;
      }
    }
    return true;
  }

  removeCartItem(cartItem: CartProduct){
    let index = 0
    this.user?.cart.map((a:any, i:any)=>{
      if(cartItem.product.id === a.productId &&
        cartItem.quantity === a.quantity &&
        cartItem.variation === a.variation){
        index = i
      }
    })
    this.user?.cart.splice(index, 1);
    this.cartProducts.splice(index, 1);
    this.logger.loggedUser.next(this.user)
    this.logger.storeUser(this.user)
  }

  clearCart(){
    this.user?.cart.splice(0,this.user.cart.length)
    this.cartProducts.splice(0, this.cartProducts.length)
    this.logger.loggedUser.next(this.user)
    this.logger.storeUser(this.user)
  }
}
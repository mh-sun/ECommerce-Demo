import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, map } from 'rxjs';
import { Cart } from '../models/cart-product.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class CartApiService{
  
  private cartProducts:Cart[] = []
  public cartSubject = new BehaviorSubject<Cart[]>(this.cartProducts)

  private url:string = 'http://localhost:3000/carts/'

  private user!:User|null
  constructor(
    private http:HttpClient,
    private logger:LogService,
    private snackBar:MatSnackBar
  ){
    this.logger.loggedUser.subscribe({
      next:(res)=>{
        this.user = res
        if(this.user!=null)
          this.cartProductLoad()
      },
      error:val=>console.error(val),
      complete:()=>console.error(' Logger user subscription complete')
    })
  }

  createCartItem(product:Product, variation:object, quantity:number):Cart
  {
    return {
      id:Math.floor(Math.random() * 1000),
      productId:product.id,
      title: product.title,
      total: {
          price:product.price,
          shipping:100,
          discount:0
      },
      description: product.description,
      image: product.image,
      variation: variation,
      quantity : quantity
    }
  }

  addToCart(product : Cart):boolean{
    if(this.user === null) {
      this.snackBar.open("Please login", "Close", {
        duration:1000
      })
      return false
    }
    let flag = false
    for (let i = 0; i < this.cartProducts.length; i++) {
      const cartItem = this.cartProducts[i];
      if(
        cartItem.productId === product.productId &&
        this.isEqualObject(cartItem.variation, product.variation)){
          flag = true
          console.log("product exists in cart")
          return false
        }
    }
    if(!flag) this.cartAdd(product)
    return true
  }

  public isEqualObject(object1:any, object2:any):boolean{
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

  cartAdd(item:Cart) {
    this.http.post<Cart>(this.url, item).subscribe({
      next:(r:Cart)=>{
        this.cartProducts.push(r)
        this.cartSubject.next(this.cartProducts)
        this.user?.carts.push(r.id)
        this.logger.loggedUser.next(this.user)
      },
      error:err=>{
        console.log(err)
      }
    })
  }
  cartUpdate(item:Cart) {
    this.http.put<Cart>(this.url + item.id, item).subscribe({
      next:(r:Cart)=>{console.log("Cart is updated", r)}
    })
  }

  removeCartItem(product: Cart){
    for (let i = 0; i < this.cartProducts.length; i++) {
      const item = this.cartProducts[i];
      if(product.id === item.id){
        this.cartProducts.splice(i, 1)
        break
      }
    }
    this.cartSubject.next(this.cartProducts)
    for (let i = 0; i < this.user!.carts.length; i++) {
      const id = this.user!.carts[i];
      if(id === product.id) {
        this.user?.carts.splice(i,1)
        this.logger.loggedUser.next(this.user)
        break
      }
    }
    this.cartDelete(product.id)
  }

  cartDelete(id: number) {
    this.http.delete<Cart>(this.url + id).subscribe({
      next:(r:Cart)=>{console.log('cart item deleted', r)}
    })
  }

  clearCart(){
    this.cartProducts = []
    this.cartSubject.next(this.cartProducts)
    this.user?.carts.splice(0, this.user.carts.length)
    this.logger.loggedUser.next(this.user)
  }

  cartProductLoad(){
    this.cartProducts = []
    this.cartSubject.next(this.cartProducts)

    console.log(this.user)
    console.log(this.user?.carts)
    this.user?.carts.forEach((i, index)=>{
      this.http.get<Cart>(this.url+ i).subscribe({
        next:(res:Cart)=>{
          this.cartProducts.push(res)
          if(index === this.user!.carts.length-1){
            console.log(this.cartProducts)
            this.cartSubject.next(this.cartProducts)
          }
        }
      })
    })
  }
}
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Cart } from '../core/models/cart-product.model';
import { Order } from '../core/models/order.model';
import { User } from '../core/models/user.model';
import { CartApiService } from '../core/services/cart-api.service';
import { LogService } from '../core/services/log.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnDestroy{

  public products : Cart[] = [];
  public grandTotal : number = 0;
  public user: User|null = null;
  public deliveryCharge:number = 100
  public address:string = ''
  // public subcriptions:Subscription = new Subscription();
  public subOff$ = new Subject()
  
  constructor(
    private cartService : CartApiService,
    private router:Router,
    private logger:LogService
  ) {
    const logSub = this.logger.loggedUser
    .pipe(takeUntil(this.subOff$))
    .subscribe({
      next:u=>{
        this.user = u
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        console.log("COMplete")
      }
    })
    // this.subcriptions.add(logSub)

    const cartSub = this.cartService.cartSubject
    .pipe(takeUntil(this.subOff$))
    .subscribe({
      next:(res)=>{
        console.log(res)
        this.products = res
        this.grandTotalPrice()
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        console.log("COMplete")
      }
    })
    // this.subcriptions.add(cartSub)
  }

  ngOnDestroy(): void {
    // this.subcriptions.unsubscribe()

    this.subOff$.next(1)
    this.subOff$.complete()
  }

  grandTotalPrice() {
    this.grandTotal = 0
    this.products.forEach(cp=>{
      this.grandTotal += (cp.total.price*cp.quantity)
    })
  }

  removeItem(item: Cart){
    console.log(item)
    this.cartService.removeCartItem(item);
  }

  emptycart(){
    this.cartService.clearCart();
  }

  checkOut(){
    let elem = document.getElementById('checkout')
    elem?.classList.contains('checkoutInActive')?
      elem.classList.remove('checkoutInActive'):
      elem?.classList.add('checkoutInActive')
  }

  getTotal(){
    return (this.grandTotal + this.deliveryCharge).toFixed(2)
  }

  makePayment(){
    let products = this.getProductDetailsForOrder()
    let order:Order = {
      id:Math.floor(Math.random()*1000).toString(),
      userid:this.user!.id,
      payment:{
        subtotal:this.grandTotal,
        shipping:this.deliveryCharge
      },
      address:this.address,
      date:(new Date()).toDateString(),
      status:"Payment Pending",
      products:products
    }
    console.log(order)
    this.user?.orders.push(order)
    this.logger.loggedUser.next(this.user)
    this.cartService.clearCart()
    this.router.navigate(['cart/payment'])
  }

  getProductDetailsForOrder() {
    let products:any = []
    this.products.forEach(p=>{
      let obj = {
        title:p.title,
        image:p.image,
        productId:p.id,
        variation:p.variation,
        quantity:p.quantity,
      }
      products.push(obj)
    })
    return products
  }
}
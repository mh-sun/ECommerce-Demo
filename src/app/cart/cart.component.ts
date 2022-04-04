import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../core/models/cart-product.model';
import { User } from '../core/models/user.model';
import { CartApiService } from '../core/services/cart-api.service';
import { LogService } from '../core/services/log.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  public products : Cart[] = [];
  public grandTotal !: number;
  public user: User|null = null;
  public deliveryCharge:number = 100

  constructor(
    private cartService : CartApiService,
    private router:Router,
    private logger:LogService
  ) {
    this.logger.loggedUser.subscribe({
      next:u=>{
        this.user = u
      }
    })
    this.cartService.cartSubject.subscribe({
      next:(res)=>{
        this.products = res
      },
      complete:()=>{
        this.grandTotalPrice()
      }
    })
  }
  grandTotalPrice() {
    this.grandTotal = 0
    this.products.forEach(cp=>{
      this.grandTotal += (cp.total.price*cp.quantity+cp.total.shipping)
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
    this.router.navigate(['cart/payment'])
  }
}


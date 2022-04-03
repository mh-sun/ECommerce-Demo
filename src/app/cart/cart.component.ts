import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from '../core/models/cart-product.model';
import { Product } from '../core/models/product.model';
import { User } from '../core/models/user.model';
import { CartApiService } from '../core/services/cart-api.service';
import { LogService } from '../core/services/log.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  public products : CartProduct[] = [];
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
        this.products = cartService.getProducts()
        console.log(2222222222222)
        this.grandTotalPrice()
      }
    })
  }
  grandTotalPrice() {
    this.cartService.grandTotal.subscribe({
      next:res=>this.grandTotal = res
    })
  }

  removeItem(item: CartProduct){
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


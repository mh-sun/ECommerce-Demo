import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../core/models/user.model';
import { CartApiService } from '../core/services/cart-api.service';
import { LogService } from '../core/services/log.service';
import { ProductsService } from '../core/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  public products : any = [];
  public grandTotal !: number;
  public user: User|null = null;
  public deliveryCharge:number = 100

  constructor(
    private cartService : CartApiService,
    private router:Router,
    private logger:LogService,
    private productApi:ProductsService
  ) {
    this.logger.loggedUser.subscribe({
      next:u=>{
        this.user = u
        this.getProducts(u?.cart)
        this.grandTotal = this.cartService.getTotalPrice()
      }
    })
  }
  getProducts(cart: any) {
    console.log(cart);
    
    cart.forEach((element:any) => {
      this.productApi.getOneProduct(element.productId).subscribe(res=>{
        this.products.push(res)
      })
    });
  }

  removeItem(item: any){
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


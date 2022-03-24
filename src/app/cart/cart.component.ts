import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartApiService } from '../core/services/cart-api.service';
import { LogService } from '../core/services/log.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products : any = [];
  public grandTotal !: number;
  public user!: any;
  public deliveryCharge:number = 100

  constructor(
    private cartService : CartApiService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    let user = localStorage.getItem('loggedUser')
    if(user !== null){
      this.user = JSON.parse(user)
      this.cartService.getProducts().subscribe({
        next:(res)=>{
          console.log(res)
          this.products = res
          this.grandTotal = this.cartService.getTotalPrice()
          console.log(this.grandTotal)
          }
      })
    }
    this.checkOut()
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.clearCart();
  }
  checkOut(){
    let elem = document.getElementById('checkout')
    elem?.classList.contains('checkoutinActive')?
      elem.classList.remove('checkoutinActive'):
      elem?.classList.add('checkoutinActive')
  }
  getTotal(){
    return (this.grandTotal + this.deliveryCharge).toFixed(2)
  }
  makePayment(){
    this.router.navigate(['cart/payment'])
  }
}

import { Component, OnInit } from '@angular/core';
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
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.clearCart();
  }
  checkOut(){
  }
}

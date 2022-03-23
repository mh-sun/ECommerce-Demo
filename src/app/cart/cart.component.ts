import { Component, OnInit } from '@angular/core';
import { CartApiService } from '../core/services/cart-api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products : any = [];
  public grandTotal !: number;
  constructor(private cartService : CartApiService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe({
      next:(res)=>{
        console.log(res)
        this.products = res
        this.grandTotal = this.cartService.getTotalPrice()
        console.log(this.grandTotal)
      }
    })
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.clearCart();
  }
}

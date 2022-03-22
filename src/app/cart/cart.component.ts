import { Component, OnInit } from '@angular/core';
import { CartApiService } from '../core/services/cart-api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products : any = [{"id":1,"title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops","price":109.95,"description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing","image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","rating":{"rate":3.9,"count":120}}];
  public grandTotal !: number;
  constructor(private cartService : CartApiService) { }

  ngOnInit(): void {
    
  }
  removeItem(item: any){
    // this.cartService.removeCartItem(item);
  }
  emptycart(){
    // this.cartService.removeAllCart();
  }
}

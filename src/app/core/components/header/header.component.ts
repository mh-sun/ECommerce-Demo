import { Component, Input } from '@angular/core';
import { CartApiService } from '../../services/cart-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logUser:String|null = ''
  cartItemNumber:number = 0
  constructor(private cartService:CartApiService){
    this.logUser = localStorage.getItem('logStatus')
    this.cartService.getProducts().subscribe({
      next:res=>{
        this.cartItemNumber = cartService.getCartItemList().length
      }
    })
  }
  
}

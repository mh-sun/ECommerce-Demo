import { Component, HostListener, Input } from '@angular/core';
import { CartApiService } from '../../services/cart-api.service';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logStatus!:boolean
  cartItemNumber:number = 0
  scrolled:boolean = false

  constructor(private cartService:CartApiService, private logger:LogService){
    this.logger.getLogStatus().subscribe({
      next:(res:boolean)=>{
        console.log(res);
        this.logStatus = res
      }
    })

    this.cartService.getProducts().subscribe({
      next:res=>{
        this.cartItemNumber = cartService.getCartItemList().length
      }
    })
  }
  
  logOut(){
    this.logger.logout()
  }

  @HostListener('window:scroll',['$event']) onScroll(){
    window.scrollY > 100 ? this.scrolled = true: this.scrolled = false
  }
}

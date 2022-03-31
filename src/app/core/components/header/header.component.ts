import { AfterViewInit, Component, HostListener, Input } from '@angular/core';
import { Order } from '../../models/order.model';
import { AuthService } from '../../services/auth.service';
import { CartApiService } from '../../services/cart-api.service';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit{

  logStatus!:boolean
  cartItemNumber:number|undefined = 0
  scrolled:boolean = false
  order:Order={
    id: 0,
    userid: 0,
    products: [],
    payment: {
      subtotal: 0,
      shipping: 0
    },
    address: '',
    date: ''
  };
  constructor(private cartService:CartApiService, private logger:LogService){
    
    this.logger.getLogStatus().subscribe({
      next:(res:boolean)=>{
        this.logStatus = res
      }
    })
    this.logger.loggedUser.subscribe({
      next:u=>{
        this.cartItemNumber = u?.cart.length
      }
    })
  }

  ngAfterViewInit(): void {
    this.cartItemNumber = this.cartItemNumber===undefined? 0 : this.cartItemNumber
  }
  
  logOut(){
    this.logger.logout()
  }

  @HostListener('window:scroll',['$event']) onScroll(){
    window.scrollY > 100 ? this.scrolled = true: this.scrolled = false
  }
}

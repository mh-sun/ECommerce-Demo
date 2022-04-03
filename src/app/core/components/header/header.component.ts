import { AfterViewInit, Component, HostListener, Input } from '@angular/core';
import { Order } from '../../models/order.model';
import { AuthService } from '../../services/auth.service';
import { CartApiService } from '../../services/cart-api.service';
import { LogService } from '../../services/log.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit{

  logStatus!:boolean
  cartItemNumber:number|undefined = 0
  scrolled:boolean = false
  orders: Order[] | undefined ;
  constructor(private cartService:CartApiService, private logger:LogService,private orderService:OrderService,private log:LogService){
    
    this.logger.getLogStatus().subscribe({
      next:(res:boolean)=>{
        this.logStatus = res
      }
    })
    this.logger.loggedUser.subscribe({
      next:u=>{
        this.orders = u?.orders;
        this.cartItemNumber = u?.cart.length
      }
    })
  }

  ngAfterViewInit(): void {
    console.log(this.orders)
    this.cartItemNumber = this.cartItemNumber===undefined? 0 : this.cartItemNumber
  }
  
  logOut(){
    this.logger.logout()
  }

  @HostListener('window:scroll',['$event']) onScroll(){
    window.scrollY > 100 ? this.scrolled = true: this.scrolled = false
  }
  sendOrder(order:Order): void {
    this.orderService.sendOrder(order);
  }
}

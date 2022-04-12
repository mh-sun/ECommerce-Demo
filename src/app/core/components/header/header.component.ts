import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { CartApiService } from '../../services/cart-api.service';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  logStatus!:boolean
  cartItemNumber:number|undefined = 0
  orders: Order[] = [] ;
  constructor(private cartService:CartApiService, private logger:LogService){
    this.logger.loggedUser.subscribe({
      next:u=>{
        this.orders = u === null? [] :u?.orders
        this.cartItemNumber = u === null? 0:u?.carts.length
        this.logStatus = u === null? false:true
      }
    })
  }
  ngOnInit(): void {
    this.cartItemNumber = this.cartItemNumber===undefined? 0 : this.cartItemNumber
  }
  
  logOut(){
    this.logger.logout()
  }
}

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
  scrolled:boolean = false
  orders: Order[] | undefined ;
  constructor(private cartService:CartApiService, private logger:LogService){
    
    // this.logger.getLogStatus().subscribe({
    //   next:(res:boolean)=>{
    //     this.logStatus = res
    //   }
    // })
    this.logger.loggedUser.subscribe({
      next:u=>{
        this.orders = u?.orders;
        this.cartItemNumber = u?.carts.length
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

  @HostListener('window:scroll',['$event']) onScroll(){
    window.scrollY > 100 ? this.scrolled = true: this.scrolled = false
  }
}

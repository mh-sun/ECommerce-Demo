import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../../models/order.model';
import { User } from '../../models/user.model';
// import { AuthService } from '../../services/auth.service';
import { LogService } from '../../services/log.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  name = 'Progress Bar';
  user: User|any;
  public counts = ["Payment Pending","Processing","Shipped",
  "Delivered"];
  public orderStatus = "Delivered";
  totalBill=0;
  order:Order|any;
  constructor(private service:ProductsService,
    // private userService:AuthService,
    private route:ActivatedRoute,
    private log:LogService,
    private router:Router) {   
  }
  ngOnInit(): void {
    console.log('ng oninit called')
    let orders:Order[]|undefined;
    const routeParams = this.route.snapshot.paramMap;
    let orderId = String(routeParams.get('id'));
    console.log(orderId)
    this.log.loggedUser.subscribe({
      next:u=>{
        orders = u?.orders;
        let userId = u?.id;
        this.user = u;
        if(orders!=null){
          for(let order of orders){
            if(order.id==orderId){
              this.order = order;
              console.log(this.order);
              this.totalBill = this.order.payment.shipping+this.order.payment.subtotal;
            }
          }
        }
      }
    })
    
  }
  
}

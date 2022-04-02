import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  name = 'Progress Bar';
  user!: User;
  //Demo purpose only, Data might come from Api calls/service
  public counts = ["Payment Pending","Processing","Shipped",
  "Delivered"];
  public orderStatus = "Delivered";
  totalBill=0;
  order:Order={
    id: 1,
    userid:1,
    products: [
    ],
    payment: {
      subtotal: 100,
      shipping: 10
    },
    address: "Cox,Bangladesh",
    date: '1/03/2020'
  };
  constructor(private service:ProductsService,private userService:AuthService) {
    this.service.getOneProduct(1).subscribe(res=>{
      this.order.products.push(res);
    })
    this.userService.getOneUser(this.order.userid).subscribe(res=>{
      console.log(res)
       this.user = res;
    })
   }

  ngOnInit(): void {
    // console.log(this.order,this.user);
    this.totalBill = this.order.payment.shipping+this.order.payment.subtotal;
  }

}

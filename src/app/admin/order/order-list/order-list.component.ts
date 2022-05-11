import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Order } from 'src/app/core/models/order.model';
import { User } from 'src/app/core/models/user.model';
import { LogService } from 'src/app/core/services/log.service';
import { OrderService } from 'src/app/core/services/order.service';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  title: string | any;
  headerTitle: string | any;
  status = false;
  displayedColumns: string[] = ['id', 'name', 'address', 'date', 'price', 'status', 'edit', 'action'];
  array: any[] = [];
  // users:User[] =[];
  dataSource: Order[] = [];
  notifier = new Subject();

  constructor(private route: Router, private orderService: OrderService,private userService:LogService) {
    this.title = 'Order List';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
  }
  ngOnInit(): void {
    this.orderService.getOrders().pipe(takeUntil(this.notifier)).subscribe(responses => {
      this.dataSource = responses;
      // for(let response of responses){
      //   console.log(response.userId)
      //   if(response.userId){
      //     this.userService.getOneUser(response.userId).subscribe(res=>{
      //       this.users.push(res);
      //     })
      //   }
      // }  
    });
  }

  ngOnDestroy(): void {
    this.notifier.next(1)
    this.notifier.complete()
  }

  removeOrder(id: string) {
    this.orderService.deleteOrder(id)
      .subscribe(response => {
        this.dataSource = this.dataSource.filter(item => item.id !== id);
      });
  }

}

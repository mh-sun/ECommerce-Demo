import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  displayedColumns: string[] = ['id', 'name', 'address', 'date', 'price', 'status', 'edit'];
  array: any[] = [];
  dataSource: any[] = [];
  constructor(private route: Router, private orderService: OrderService) {
    this.title = 'Order List';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
  }
  ngOnInit(): void {
    // this.service.getOrders().subscribe(res=>{
    //   // for(let x of res){
    //   //   this.array.push( x.order);
    //   // }
    //   // this.dataSource = this.array;
    //   this.dataSource = res;
    //   console.log(this.dataSource)
    // })
    this.orderService.getOrders().subscribe(res => {
      this.dataSource = res;
      console.log(res);
    })
  }
  changeStatus(i: number) {
    console.log(this.dataSource[i])
    this.dataSource[i].status = 'Dispatched';
    console.log(this.dataSource[i]);
    let index = i + 1;
    this.orderService.updatePost(this.dataSource[i], index);

  }

}

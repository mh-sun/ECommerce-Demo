import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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
  notifier = new Subject();
  
  constructor(private route: Router, private orderService: OrderService) {
    this.title = 'Order List';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
  }
  ngOnInit(): void {
    this.orderService.getOrders().pipe(takeUntil(this.notifier)).subscribe(res => {
      this.dataSource = res;
    });
  }

  ngOnDestroy(): void {
    this.notifier.next(1)
    this.notifier.complete()
  }

  changeStatus(i: number) {
    this.dataSource[i].status = 'Dispatched';
    let index = i + 1;
    this.orderService.updatePost(this.dataSource[i], index);
  }

}

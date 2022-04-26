import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from 'src/app/core/services/log.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { OrderService } from 'src/app/core/services/order.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title: string | any;
  headerTitle: string | any;
  totalProduct = 0;
  totalUser = 0;
  totalOrder = 0;
  notifier = new Subject();

  constructor(private route: Router, private productService: ProductsService, private userService: LogService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.title = 'Dashboard';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;

    this.productService.getProduct().pipe(takeUntil(this.notifier)).subscribe((res: any) => {
      this.totalProduct = res.length;
    });
    this.userService.getUsers().pipe(takeUntil(this.notifier)).subscribe((res: any) => {
      this.totalUser = res.length;
    });
    this.orderService.getOrders().pipe(takeUntil(this.notifier)).subscribe((res: any) => {
      this.totalOrder = res.length;
    })
  }

  ngOnDestroy(): void {
    this.notifier.next(1)
    this.notifier.complete()
  }

}

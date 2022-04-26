import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { productDetails } from 'src/app/core/models/order.model';
import { LogService } from 'src/app/core/services/log.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  data: any;
  productStatus: string | any;
  products: productDetails[] = [];
  productIdFromRoute: number | any;
  title: string | any;
  headerTitle: string | any;
  statusQueue = ["Payment Pending", "Processing", "Shipped", "Delivered"];
  notifier = new Subject();

  constructor(private route: ActivatedRoute, private service: OrderService, private log: LogService) {
    this.title = 'Order View';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.productIdFromRoute = Number(routeParams.get('id'));

    this.service.getOneOrder(this.productIdFromRoute).pipe(takeUntil(this.notifier)).subscribe(res => {
      this.products = res.products;
      this.productStatus = res.status;
      this.data = res;
      console.log(this.data)
    });

  }

  ngOnDestroy(): void {
    this.notifier.next(1)
    this.notifier.complete()
  }

  changeStatus(status: string, event: any) {
    if (event.isUserInput) {
      this.productStatus = status
      this.data.status = status;
      this.service.updateOrder(this.data, this.productIdFromRoute);
    }
  }

  removeItem(i: number) {

  }

}

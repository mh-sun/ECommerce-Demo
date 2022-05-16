import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from 'src/app/core/services/log.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { OrderService } from 'src/app/core/services/order.service';
import { Subject, takeUntil } from 'rxjs';
import { Chart, ChartOptions, ChartType } from 'chart.js';


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
  
  public barChartOptions = {
    
    scaleShowVerticalLines: false,
    // responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011'];
  barChartType = 'bar';
  public barChartLegend = false;
  public barChartData = [
    {
      data: [65, 59, 80, 81, 56, 55],
      label: 'Series A',
      backgroundColor: [
        'darkblue'
        // 'rgba(85, 110, 162, 0.2)',
      ],
      borderColor: [
        'dimgray'
        // 'rgba(85, 110, 162,1 )',
      ],
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
      borderWidth: 1
    },
    {
      data: [28, 48, 40, 19, 86, 27],
      label: 'Series B',
      backgroundColor: [
        'rgba(54, 122, 235, 0.2)',
      ],
      borderColor: [
        'rgba(54, 122, 235, 1)',
      ]
    },
  ];

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

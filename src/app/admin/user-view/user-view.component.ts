import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Order } from 'src/app/core/models/order.model';
import { User } from 'src/app/core/models/user.model';
import { LogService } from 'src/app/core/services/log.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  title: string | any;
  headerTitle: string | any;
  user: User | any;
  userIdFromRoute!: number;
  notifier = new Subject();
  orders:Order[] =[];

  constructor(private route: ActivatedRoute, private service: LogService,private orderService:OrderService) { }

  ngOnInit(): void {
    this.title = 'View User Details';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
    const routeParams = this.route.snapshot.paramMap;
    this.userIdFromRoute = Number(routeParams.get('id'));
    this.service.getOneUser(this.userIdFromRoute).pipe(takeUntil(this.notifier)).subscribe((res) => {
      this.user = res;
      if(this.user!==null){
        this.orderService.getUserOrders(this.user.orders)
        .pipe(takeUntil(this.notifier))
        .subscribe(orders=>{
          console.log(orders)
          let c = 0
          for(let i = orders.length-1;i>=0;i--){
            if(c<3) {
              this.orders.push(orders[i])
              c++
            }
            else break
          }
        })
      }     
    });
  }

  ngOnDestroy(): void {
    this.notifier.next(1)
    this.notifier.complete()
  }

}

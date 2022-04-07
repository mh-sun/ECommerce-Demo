import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { orderAdmin } from 'src/app/core/models/admin.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  title:string|any;
  headerTitle:string|any;
  displayedColumns: string[] = ['id', 'name', 'address','date','price','status','edit'];
  dataSource:any;
  constructor(private route:Router  ,private service:AdminService) { 
    this.title = 'Order List';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
  }
  ngOnInit(): void {
    this.service.getOrderDetails().subscribe(res=>{
      console.log(res)
    })
  }

}

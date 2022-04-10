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
  status=false;
  displayedColumns: string[] = ['id', 'name', 'address','date','price','status','edit'];
  array:any[]=[];
  dataSource:any[]=[];
  constructor(private route:Router  ,private service:AdminService) { 
    this.title = 'Order List';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
  }
  ngOnInit(): void {
    this.service.getOrders().subscribe(res=>{
      // for(let x of res){
      //   this.array.push( x.order);
      // }
      // this.dataSource = this.array;
      this.dataSource = res;
      console.log(this.dataSource)
    })
  }
  changeStatus(i:number){
    console.log(this.dataSource[i])
      this.dataSource[i].status='Dispatched';
    console.log(this.dataSource[i]);
    let index = i+1; 
    this.service.updatePost(this.dataSource[i],index);
  
  }

}

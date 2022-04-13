import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from 'src/app/core/services/log.service';
import { AdminService } from 'src/app/core/services/admin.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title:string|any;
  headerTitle:string|any;
  totalProduct=0;
  totalUser=0;
  totalOrder=0;
  constructor(private route:Router,private productService:ProductsService,private userService:LogService,private adminService:AdminService ) { 
  }

  ngOnInit(): void {
    this.title = 'Dashboard';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;

    this.productService.getProduct().subscribe((res:any)=>{
       console.log(res.length)
      this.totalProduct=res.length;
    });
    this.userService.getUsers().subscribe((res:any)=>{
      this.totalUser = res.length;
    });
    this.adminService.getOrders().subscribe((res:any)=>{
      this.totalOrder = res.length;
    })
  }
}

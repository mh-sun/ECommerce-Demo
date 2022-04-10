import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from 'src/app/core/services/log.service';
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
  constructor(private route:Router,
    private productService:ProductsService,
    private userService:LogService ) { 
  }

  ngOnInit(): void {
    this.title = 'Home';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;

    this.productService.getProduct().subscribe(res=>{
       console.log(res.length)
      // for(let i in res){
      //   this.totalProduct=+i;
      // }
      this.totalProduct=res.length;
    });
    this.userService.getUsers().subscribe(res=>{
      this.totalUser = res.length;
    });
   // console.log(this.totalProduct,this.totalUser)
  }
}

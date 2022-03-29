import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductEditComponent } from '../product-edit/product-edit.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title:string|any;
  headerTitle:string|any;
  displayedColumns: string[] = ['id', 'title', 'price','description','edit','delete'];
  dataSource:Product[] = [];

  constructor(private route:Router  ,private service:ProductsService) { 
    this.title = 'Product List';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
  }

  ngOnInit(): void {
   
    this.service.getProduct().subscribe((res)=>{
      this.dataSource = res;
    });
  }
  // edit(id:number){
  //   console.log('called')
  //   console.log(this.route.url)
  //   // this.comp.getProduct(id);
  // console.log(id)
  // }
  delete(id:number){
    this.service.deletePost(id);
    this.ngOnInit();
  }

  addData(){}
  clearTable(){}
}

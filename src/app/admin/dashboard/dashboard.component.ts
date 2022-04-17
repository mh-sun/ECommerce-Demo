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
  displayedColumns: string[] = ['id', 'title', 'price','description','availailability','edit'];
  dataSource:any;
  active!:string;
  constructor(private route:Router  ,private service:ProductsService) { 
    this.title = 'Product List';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
  }

  ngOnInit(): void {
   
    this.service.getProduct().subscribe((res)=>{
      this.dataSource = res;
      console.log(this.dataSource)
    });

  }

  activate(state:boolean,i:number){
    console.log(state,this.dataSource[i])
      this.dataSource[i].isActive=!state;
      console.log(state,this.dataSource[i]);
      let index = i+1; 
      this.service.updatePost(this.dataSource[i],index);
  
  }
  
  delete(id:number){
    this.service.deletePost(id);
    this.ngOnInit();
  }

  addData(){}
  clearTable(){}
}

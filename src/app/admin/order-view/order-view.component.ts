import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { productDetails } from 'src/app/core/models/admin.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  data:any;
  productStatus:string|any;
  products:productDetails[] = [];
  productIdFromRoute: number | any;
  title:string|any;
  headerTitle:string|any;
  constructor(private route:ActivatedRoute,private service:AdminService) { 
    this.title = 'Order View';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
     this.productIdFromRoute = Number(routeParams.get('id'));
    this.service.getOneProduct(this.productIdFromRoute).subscribe(res=>{
      this.products = res.products;
      this.productStatus = res.status;
      this.data = res;
    })
  }
  changeStatus(){
    console.log(this.data);
    this.productStatus = "Dispatched"
    this.data.status='Dispatched';
  console.log(this.data); 
  this.service.updatePost(this.data,this.productIdFromRoute);
  }

}

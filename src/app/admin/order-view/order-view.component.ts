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
  products:productDetails[] = [];
  productIdFromRoute: number | undefined;
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
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  title:string|any;
  headerTitle:string|any;
  product:Product|any;
  productIdFromRoute!: number;
  
  constructor(private route:ActivatedRoute,private service:ProductsService) { }

  ngOnInit(): void { 
    this.title = 'Edit Product';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
    const routeParams = this.route.snapshot.paramMap;
    this.productIdFromRoute = Number(routeParams.get('id'));
    this.service.getOneProduct(this.productIdFromRoute).subscribe((res)=>{
      this.product = res;
      console.log(this.product)
    })
  }
  activate(state:boolean){
    console.log(state)
      this.product.isActive=state;
      console.log(state,this.product,this.productIdFromRoute);
      this.service.updatePost(this.product,this.productIdFromRoute);
  
  }

}

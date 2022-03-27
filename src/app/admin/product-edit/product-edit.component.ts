import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  title:string|any;
  headerTitle:string|any;
  product:Product|any;
  productEditForm:any;
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private service:ProductsService) { }

  ngOnInit(): void {
    this.title = 'Edit Product';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
    const routeParams = this.route.snapshot.paramMap;
     const productIdFromRoute = Number(routeParams.get('id'));
    // //  this.id = productIdFromRoute;
    // console.log(productIdFromRoute);
    // console.log('called Product edit')
    this.service.getOneProduct(productIdFromRoute).subscribe((res)=>{
      console.log(res);
      this.product = res;
    });
    
     this.productEditForm = this.fb.group({
      // title:[value]
    });
    


  }

  getProduct(){
    
  }
}

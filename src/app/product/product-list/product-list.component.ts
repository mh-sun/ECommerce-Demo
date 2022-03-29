import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/product.model';
import { CartApiService } from 'src/app/core/services/cart-api.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent{
  public productList : any ;
  public filterCategory : any
  searchKey:string ="";

  constructor(private api : ProductsService, private cartService : CartApiService,
    private dialog:MatDialog) {
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
      this.filterCategory = res;
    });
  }
  addtocart(item: any){
    this.cartService.addToCart(item);
  }
  onClickAddCart(){

  }

  onClickDiscover(){

  }
  viewProduct(product:any){
    this.dialog.open(ProductDetailsComponent, {
      data: product,
    })
  }
}
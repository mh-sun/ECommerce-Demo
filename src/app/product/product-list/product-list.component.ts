import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cart } from 'src/app/core/models/cart-product.model';
import { Product } from 'src/app/core/models/product.model';
import { CartApiService } from 'src/app/core/services/cart-api.service';
import { LogService } from 'src/app/core/services/log.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent{
  public productList : any ;
  public filterCategory = new Array();
  public carouselItems = new Array()
  searchKey:string ="";
  // isLoggedIn:boolean = false

  constructor(private api : ProductsService, 
    private cartService : CartApiService,
    private dialog:MatDialog,
    private logger:LogService,
    private router:Router) {

    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
      for(let product of this.productList){
        if(product.isActive){
          this.filterCategory.push(product)
        }  
      }
      for(let i = 0; i < 3; i++){
        this.carouselItems.push(this.filterCategory[i])
      }
    });
  }
  
  addtocart(item: Product){
    let cartItem:Cart = this.cartService.createCartItem(item, item.variation[0].type, 1)
    this.cartService.addToCart(cartItem);
    
  }

  viewProduct(product:any){
    console.log(product.id)
    this.router.navigate(["/products", product.id])
  }
}
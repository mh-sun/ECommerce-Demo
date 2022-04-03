import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/product.model';
import { CartApiService } from 'src/app/core/services/cart-api.service';
import { LogService } from 'src/app/core/services/log.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';

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
  isLoggedIn:boolean = false

  constructor(private api : ProductsService, 
    private cartService : CartApiService,
    private dialog:MatDialog,
    private logger:LogService) {

    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
      // console.log(this.productList)
      for(let product of this.productList){
        if(product.isActive){
          this.filterCategory.push(product)
        }  
      }
      for(let i = 0; i < 3; i++){
        this.carouselItems.push(this.filterCategory[i])
      }
    });

    this.logger.getLogStatus().subscribe({
      next:res=>this.isLoggedIn = res
    })
  }
  
  addtocart(item: any){
    let cartItem:any = {
      productId : item.id,
      variation : {},
      quantity: 1
    }
    for(let var_key in item.variation){
      cartItem.variation[var_key] = item.variation[var_key][0]
    }
    // console.log(cartItem);
    this.cartService.addToCart(cartItem);
  }

  viewProduct(product:any){
    this.dialog.open(ProductDetailsComponent, {
      data: product,
    })
  }
}
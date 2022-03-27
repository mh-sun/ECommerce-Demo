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
      this.productList.forEach((a:any) => {
      //   // if(a.category ==="women's clothing" || a.category ==="men's clothing"){
      //   //   a.category ="fashion"
      //   // }
        Object.assign(a,{quantity:1,total:a.price});
      });
      // console.log(this.productList)
    });

    // this.cartService.search.subscribe((val:any)=>{
    //   this.searchKey = val;
    // })
  }

  addtocart(item: any){
    this.cartService.addToCart(item);
  }

  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }
  onClickAddCart(){

  }

  onClickDiscover(){

  }
  viewProduct(product:any){
    console.log(product);
    let dialogRef = this.dialog.open(ProductDetailsComponent, {
      data: product,
    })
    // dialogRef.afterClosed().subscribe(res=>console.log)
  }
}
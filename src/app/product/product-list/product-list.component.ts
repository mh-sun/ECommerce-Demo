import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
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
export class ProductListComponent implements OnDestroy{
  public productList : Product[] = [];
  public filterCategory = new Array();
  public categories: any[] = []
  public carouselItems = new Array()
  public searchKey:string ="";
  // public subcriptions:Subscription = new Subscription()
  public subOff$ = new Subject()

  constructor(
    private api : ProductsService, 
    private cartService : CartApiService,
    private dialog:MatDialog,
    private logger:LogService,
    private router:Router
  ){
    const productSub = this.api.getProduct()
    .pipe(takeUntil(this.subOff$))
    .subscribe(res=>{
      this.productList = res;
      this.filterCategory = this.productList.filter(p=>{
        return p.isActive
      })

      this.setCarousel(this.productList)

      this.setCategory(this.productList)
    })
    // this.subcriptions.add(productSub)
  }

  ngOnDestroy(): void {
    // this.subcriptions.unsubscribe()

    this.subOff$.next(1)
    this.subOff$.complete()
  }

  setCarousel(productList: Product[]) {
    for(let i = 0; i < 3; i++){
      this.carouselItems.push(this.filterCategory[i])
    }
  }

  setCategory(productList: Product[]) {
    this.productList.forEach(p=>{
      if(this.categories.indexOf(p.category) < 0) this.categories.push(p.category)
    })
  }
  
  addtocart(item: Product){
    let cartItem:Cart = this.cartService.createCartItem(item, item.variation[0].type, 1)
    this.cartService.addToCart(cartItem);
    
  }

  viewProduct(product:any){
    console.log(product.id)
    this.router.navigate(["/products", product.id])
  }

  filterProduct(category:string){
    this.filterCategory = this.productList.filter(p=>{
      return p.category === category
    })
  }

  filterNone(){
    this.filterCategory = this.productList
  }
}
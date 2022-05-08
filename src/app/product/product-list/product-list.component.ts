import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Cart } from 'src/app/core/models/cart-product.model';
import { Product } from 'src/app/core/models/product.model';
import { CartApiService } from 'src/app/core/services/cart-api.service';
import { LogService } from 'src/app/core/services/log.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { SearchProductsService } from 'src/app/core/services/search-products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnDestroy{
  public productList : Product[] = [];
  public filteredProduct = new Array();

  public categories: any[] = ["men's clothing", "women's clothing","jewelery", "electronics"]
  public currentCategory:string = ""
  public searchKey:string = "";

  public allProductLoaded:boolean = false
  public loader:boolean = false
  public carouselItems = new Array()
  
  public subOff$ = new Subject()

  constructor(
    private api : ProductsService, 
    private cartService : CartApiService,
    private dialog:MatDialog,
    private logger:LogService,
    private router:Router,
    private keyword:SearchProductsService,
  ){
    this.api.getNextProducts().pipe(takeUntil(this.subOff$)).subscribe(res=>{
      this.productList = res;
      this.filteredProduct = this.productList
      console.log(this.filteredProduct)
      this.setCarousel()
    })

    this.keyword.keyword$.pipe(takeUntil(this.subOff$)).subscribe(key=>{
      this.filterProductByKeywd(key)
    })
  }

  ngOnDestroy(): void {
    this.subOff$.next(1)
    this.subOff$.complete()
    this.api.productCountReset()
  }

  filterProductByKeywd(key: string) {
    this.searchKey = key
    this.filteredProduct = this.productList.filter(product=>{
      if(key === '') return true
      return product.title.toLowerCase().includes(key.toLowerCase())
    })
  }

  setCarousel() {
    let len = this.productList.length>3? 3:this.productList.length
    for(let i = 0; i < len; i++){
      this.carouselItems.push(this.productList[i])
    }
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
    this.currentCategory = category
    this.filteredProduct = this.productList.filter(p=>{
      if(category === '') return true
      return p.category === this.currentCategory
    })
  }

  filterNone(){
    this.filteredProduct = this.productList
  }

  onScroll(){
    if(!this.allProductLoaded && !this.loader){

      this.loader = true

      setTimeout(() => {
        this.api.getNextProducts().pipe(takeUntil(this.subOff$)).subscribe(res=>{
          if(res.length === 0) {
            this.loader = false
            this.allProductLoaded = true
            return
          }

          this.productList = this.productList.concat(res)

          this.filterProduct(this.currentCategory)
          this.filterProductByKeywd(this.searchKey)

          this.loader = false
        })
      }, 2000);
    }
  }
}
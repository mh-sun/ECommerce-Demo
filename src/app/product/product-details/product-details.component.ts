import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Cart } from 'src/app/core/models/cart-product.model';
import { Product } from 'src/app/core/models/product.model';
import { User } from 'src/app/core/models/user.model';
import { CartApiService } from 'src/app/core/services/cart-api.service';
import { LogService } from 'src/app/core/services/log.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit{

  public var_keys:any = []
  public variation:any = {}
  public quantity:number = 1
  public data!:Product
  private user!:User|null;

  constructor(
    private cartService: CartApiService,
    private logger:LogService,
    private productService:ProductsService
  ) {
    this.logger.loggedUser.subscribe({
      next:(u)=>{
        this.user = u
      }
    })
  }
  ngOnInit(): void {
    this.productService.getOneProduct(2).subscribe({
      next:res=>{
        this.data = res
      },
      complete:()=>{
        for (const variation of this.data.variation) {
          console.log(variation)
        }
        // this.var_keys.forEach((k:any)=>{
        //   this.variation[k] = this.data.variation[k][0]
        // })
      }
    })
    
  }
  
  addtocart(item: Product){
    let c:Cart = this.cartService.createCartItem(item, this.variation, this.quantity)

    this.cartService.addToCart(c)
  }

  increaseQuantity(){
    this.quantity++
  }

  decreaseQuantity(){
    if(this.quantity<=0) return
    else this.quantity--
  }

}

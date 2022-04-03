import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { Product } from 'src/app/core/models/product.model';
import { CartApiService } from 'src/app/core/services/cart-api.service';
import { LogService } from 'src/app/core/services/log.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: "primary" },
}]
})
export class ProductDetailsComponent {

  public var_keys:any = []
  public variation:any = {}
  public quantity:number = 1
  private user:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef:MatDialogRef<ProductDetailsComponent>,
    private cartService: CartApiService,
    private logger:LogService
  ) 
  {
    this.var_keys = Object.keys(this.data.variation)
    this.var_keys.forEach((k:any)=>{
      this.variation[k] = this.data.variation[k][0]
    })

    this.logger.loggedUser.subscribe({
      next:(u:object|null)=>{
        this.user = u
      }
    })
  }

  close(){
    this.dialogRef.close()
  }
  
  addtocart(item: Product){
    if(this.user.cart === undefined) this.user.cart = []

    let c = {
      productId : item.id,
      variation: this.variation,
      quantity: this.quantity
    }

    this.user.cart.push(c)
    this.logger.loggedUser.next(this.user)
    this.logger.storeUser(this.user)
    this.productInCart(item.id)
  }

  increaseQuantity(){
    this.quantity++
  }

  decreaseQuantity(){
    if(this.quantity<=0) return
    else this.quantity--
  }

  productInCart(id:number){
    let arr = this.user.cart.map((i:any)=>i.id)
  }
}

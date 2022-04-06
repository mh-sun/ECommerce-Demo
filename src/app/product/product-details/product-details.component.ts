import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
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

  public var_keys:any = {}
  public variation:any = {}
  public quantity:number = 1
  public data:any = null
  private user!:User|null;

  constructor(
    private cartService: CartApiService,
    private logger:LogService,
    private productService:ProductsService,
    private route:ActivatedRoute
  ) {
    this.logger.loggedUser.subscribe({
      next:(u)=>{
        this.user = u
      }
    })
  }
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.productService.getOneProduct(id).subscribe({
      next:res=>{
        this.data = res
        for(let var_i of this.data.variation){
          let keys = Object.keys(var_i.type)
          keys.forEach(k=>{
            if(!this.var_keys[k]) this.var_keys[k] = []
            let val = var_i.type[k]
            if(this.var_keys[k].indexOf(val) <= -1) 
              this.var_keys[k].push(val)
          })
        }
        console.log(this.var_keys);
      }
    })
  }
  
  addtocart(item: Product){
    let c:Cart = this.cartService.createCartItem(item, this.variation, this.quantity)

    this.cartService.addToCart(c)
  }

  public isEqualObject(object1:any, object2:any):boolean{
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      if (val1 !== val2) {
        return false;
      }
    }
    return true;
  }

  getQuantity():number{
    this.data.variation.forEach((e:any)=>{
      if(this.isEqualObject(e.type, this.variation))
      return e.quantity
    })
    
    return -1
  }

  increaseQuantity(){
    console.log(this.variation)
    let quant:number = this.getQuantity()
    if(quant === -1) console.log("Product not found")
    if(this.quantity >= quant) return
    this.quantity++
  }

  decreaseQuantity(){
    console.log(this.variation)
    if(this.quantity<=1) return
    else this.quantity--
  }

  public getList(arr:any):any[]{
    return Array.isArray(arr)?arr:[]
  }

}

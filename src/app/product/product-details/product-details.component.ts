import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  providers:[{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})

export class ProductDetailsComponent implements OnInit{

  public var_keys:string[]= []
  public var_values:any = []
  public variation:any = {}
  public quantity:number = 1
  public data:any = null
  constructor(
    private cartService: CartApiService,
    private logger:LogService,
    private productService:ProductsService,
    private route:ActivatedRoute,
    private snackBar:MatSnackBar
  ) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.productService.getOneProduct(id).subscribe({
      next:res=>{
        this.data = res
        for(let var_i of this.data.variation){
          let keys = Object.keys(var_i.type)
          keys.forEach((k)=>{
            if(this.var_keys.indexOf(k) <= -1)
              this.var_keys.push(k)
          })
        }
        this.var_keys.forEach(key=>{
          let arr:any = []
          for(let var_i of this.data.variation){
            if(arr.indexOf(var_i.type[key]) === -1){
              arr.push(var_i.type[key])
            }
          }
          this.var_values.push(arr)
        })
        this.variation=res.variation[0].type
      }
    })
  }
  
  addtocart(item: Product){
    console.log(this.variation)
    let c:Cart = this.cartService.createCartItem(item, this.variation, this.quantity)
    if(Object.keys(this.variation).length !== this.var_keys.length){
      this.showSnackBar("Please Select a full variant", 1000)
      return
    }
    else if(!this.variationExists()){
      this.showSnackBar("Please Select a valid variant", 1000)
      return
    }
    else if(this.getQuantity() < 0){
      this.showSnackBar("Please Select a valid quantity", 1000)
      return
    }
    console.log(c)
    if(this.cartService.addToCart(c)) this.showSnackBar("Product added successfully", 1000)
    else this.showSnackBar("Add product unsuccessful", 1000)
  }

  variationExists():boolean {
    for (const variation of this.data.variation) {
      if(this.isEqualObject(variation.type, this.variation)){
        return true
      }
    }
    return false
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
    if(Object.keys(this.variation).length !== this.var_keys.length) return -1
    for(let e of this.data.variation){
      if(this.isEqualObject(e.type, this.variation))
      return e.quantity
    }
    return -2
  }

  increaseQuantity(){
    let quant:number = this.getQuantity()
    if(quant === -1){
      this.showSnackBar("Please Select a full variant", 1000)
      return
    } 
    else if (quant === -2){
      this.showSnackBar("Product variation not found", 1000)
      return
    }
    if(this.quantity >= quant) {
      this.showSnackBar("Product quantity is at limit", 1000)
      return
    }
    this.quantity++
  }

  decreaseQuantity(){
    if(this.quantity<=1) {
      this.showSnackBar("Product quantity cannot be 0", 1000)
      return
    }
    else this.quantity--
  }

  public showSnackBar(message:string, time:number){
    this.snackBar.open(message, "Close", {
      duration:time
    })
  }
}
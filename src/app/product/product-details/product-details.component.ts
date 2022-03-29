import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
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
    private loggedUser:LogService
  ) 
  {
    this.var_keys = Object.keys(this.data.variation)
    this.var_keys.forEach((k:any)=>{
      this.variation[k] = this.data.variation[k][0]
    })

    this.loggedUser.loggedUser.subscribe({
      next:(u:object|null)=>{
        this.user = u
        console.log(this.user)
      }
    })
  }

  close(){
    this.dialogRef.close()
  }
  addtocart(item: any){
    console.log(item.title, this.variation);
    console.log(this.user);
  }
  increaseQuantity(){
    this.quantity++
  }
  decreaseQuantity(){
    if(this.quantity<=0) return
    else this.quantity--
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';

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

  public variations:any = []
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef:MatDialogRef<ProductDetailsComponent>
  ) {
    this.variations = Object.keys(this.data.variation)
    console.log(this.data.variation);
    
  }
  close(){
    this.dialogRef.close()
  }
  
}

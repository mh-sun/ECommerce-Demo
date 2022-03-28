import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  public var_keys:any = []
  public Variation:any = {}
  url: any; 
  msg = "";
  variation=true;
  newVariation=false;
  title:string|any;
  headerTitle:string|any;
  product:Product|any;
  productEditForm:FormGroup|any;
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private service:ProductsService) {
    console.log(this.variation)
   }

  ngOnInit(): void {
    
    this.title = 'Edit Product';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('id'));
    this.service.getOneProduct(productIdFromRoute).subscribe((res)=>{
      this.product = res;
      console.log(this.product.variation.color)
      let v = this.product.variation ;
      console.log(Object.keys(v).length)
      if(Object.keys(v).length!=0){
        this.variation = false;
      }
      else{
        this.variation = true;
      }
      this.productEditForm = this.fb.group({
        title:[this.product.title,],
        price:[this.product.price,],
        description:[this.product.description,],
        category:[this.product.category,],
        image:[this.product.image,],
        
     });
     this.var_keys = Object.keys(this.product.variation)
     this.var_keys.forEach((k:any)=>{
       this.Variation[k] = this.product.variation[k][0]
     })
     console.log(this.Variation,this.var_keys)
     this.product.image = this.productEditForm.get('image').value;
     console.log(this.product.image)
     console.log( this.productEditForm.get('image').value);
    });

  }
 
  addVariation(){
    this.newVariation = true;
  }
  onSubmit(){
    this.product.image = this.productEditForm.get('image').value;
     console.log(this.product.image)
    console.log(this.productEditForm.value)
  }
}

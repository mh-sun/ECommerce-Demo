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
  // url: any; 
  msg = "";
  index:number | undefined;
  existValue=false;
  addVariant=false;
  // removeType=false;
  title:string|any;
  headerTitle:string|any;
  product:Product|any;
  productEditForm:FormGroup|any;
  productIdFromRoute!: number;
  
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private service:ProductsService) {}

  ngOnInit(): void {
    this.title = 'Edit Product';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
    const routeParams = this.route.snapshot.paramMap;
     this.productIdFromRoute = Number(routeParams.get('id'));
    this.service.getOneProduct(this.productIdFromRoute).subscribe((res)=>{
      this.product = res;
      console.log(this.product)
      this.productEditForm = this.fb.group({
        title:[this.product.title,],
        price:[this.product.price,],
        description:[this.product.description,],
        category:[this.product.category,],
        image:[this.product.image,],
        
     });
     
     this.var_keys = Object.keys(this.product.variation)
     //console.log();
     this.var_keys.forEach((k:any)=>{
       this.Variation[k] = this.product.variation[k][0]
     })
     console.log(this.Variation,this.var_keys)
     this.product.image = this.productEditForm.get('image').value;

    });

  }
  changeType(index:number){
    console.log(index)
      this.index = index;
    
  }

  check(key:string,input:string){
    console.log(input)
    for(let v of this.product.variation[key]){
      if(this.product.variation[key].indexOf(input) !== -1){
        this.msg = 'Already exist';
        break;
    } 
    else{
      this.msg = ''
    }
  }
  }

  addVariation(key:string,input:string){
    input = input.toString();
    console.log(key,input,this.product.variation[key])
    console.log(input in this.product.variation[key] )
    console.log(this.product.variation[key].indexOf(input));
    for(let v of this.product.variation[key]){
      console.log(this.existValue)
      if(this.product.variation[key].indexOf(input) !== -1){
      //  this.msg = 'Already exist';
      this.existValue = true;
      console.log(this.existValue)
        break;
    } 
    else{
      this.product.variation[key].push(input);
      this.index=-1;
      break;
    }
    }
    console.log(this.product.variation[key][0])
    
  }
  removeVariation(key:string,index:number){
    this.product.variation[key].splice(index,1)
     console.log(this.product.variation[key])
  }

  addMore(input1:string,input2:string){
    console.log(input1,input2);
    let arr = new Array(input2);
    this.product.variation[input1] = arr;
    console.log(this.product.variation)
    this.var_keys = Object.keys(this.product.variation)
     //console.log();
     this.var_keys.forEach((k:any)=>{
       this.Variation[k] = this.product.variation[k][0]
     })
     console.log(this.Variation,this.var_keys);
     this.addVariant = false;
  }

  onSubmit(){
    let arr = ['title','price','description','category','image'];
    for(let key of arr){
      console.log(key)
      this.product[key] = this.productEditForm.get(key).value;

    }
    
    console.log('onsubmit:' ,this.productEditForm.value,'Product Detail:',this.product);
    this.service.updatePost(this.product,this.productIdFromRoute);
  }
}

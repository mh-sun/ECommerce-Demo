import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import {Variation} from 'src/app/core/models/variation.model';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @ViewChild('box') inputQtn: any; 
  quantity:number[]=[];
  valueArray = new Array();
  Variation:Variation[]|any = [];
  variation:Variation|any;
  msg = "";
  index:number | undefined;
  existValue=false;
  addVariant=false;
  title:string|any;
  headerTitle:string|any;
  product:Product|any;
  typeForm:FormGroup|any;
  productEditForm:FormGroup|any;
  productIdFromRoute!: number;
  variantType=true;
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
        types:this.fb.array([
          // this.addTypeGroup()
        ])
     });
     for(let variation of this.product.variation){
      this.Variation.push(variation['type'])
      this.quantity.push(variation['quantity'])
     }
     this.product.image = this.productEditForm.get('image').value;

    });

  }
  get types(){
    return this.productEditForm.get('types') as FormArray
  }
  changeType(index:number){
    console.log(index)
      this.index = index;
    
  }

  // check(key:string,input:string){
  //   console.log(input)
  //   for(let v of this.product.variation[key]){
  //     if(this.product.variation[key].indexOf(input) !== -1){
  //       this.msg = 'Already exist';
  //       break;
  //   } 
  //   else{
  //     this.msg = ''
  //   }
  // }
  // }
  private addTypeGroup(): FormGroup {
    return this.fb.group({
      key: [],
      value: []
    });
  }
  addType(){
    this.types.push(this.addTypeGroup())
  }
  removeType(index: number): void {
    this.types.removeAt(index);
  }
  // addType(){
  //   this.typeForm =this.fb.group({
  //     key:[this.typeForm.get('key').value],
  //     value:['']
  //   })
  //   this.types.push(this.typeForm); 
  //   console.log(this.types)
  //   this.types.updateValueAndValidity();
  //   console.log(this.types)
  // }

  addVariation(key:string,input:string){
    input = input.toString();
    console.log(key,input,this.product.variation[key])
    console.log(input in this.product.variation[key] )
    console.log(this.product.variation[key].indexOf(input));
    for(let v of this.product.variation[key]){
      console.log(this.existValue)
      if(this.product.variation[key].indexOf(input) !== -1){
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

  removeVariation(index:number){
    this.product.variation.splice(index,1)
    this.Variation.splice(index,1)
    console.log(this.product.variation,this.Variation)
  }

  haveSameData(obj1:Object|any, obj2:Object|any) {
    const obj1Length = Object.keys(obj1).length;
    const obj2Length = Object.keys(obj2).length;

    if (obj1Length === obj2Length) {
        return Object.keys(obj1).every(
            key => obj2.hasOwnProperty(key)
                && obj2[key] === obj1[key]);
    }
    return false;
  }

  // addMore(typeKey:string,typeValue:string,quantity:string){
  //   let key = typeKey;
  //   console.log(typeKey,typeValue);
  //   let obj:any={
  //     type:{
  //     },
  //     quantity:quantity
  //   };
  //   obj.type[typeKey] = typeValue;
  //   for(let variation of this.Variation){
  //     console.log(obj.type,variation)
  //     if(this.haveSameData(variation,obj.type)){
  //        console.log('Variation already exist')
  //        break;
  //     }
  //     else{
  //       console.log('ok')
  //     }
      
  //   }
    
  //   // this.variation = obj.type;
  //   // this.Variation.push(this.variation)   
  //   // this.product.variation.push(obj);
  //   // this.var_keys.push(Object.keys(this.variation))
  //   console.log(obj,this.Variation,this.product.variation)
  //   this.addVariant = false;
  // }

  addMore(quantity:string){
    console.log(this.types,quantity);
    let obj:any={
      type:{
      },
      quantity:quantity
    };
   
     for(let x of this.types.value){
      console.log(x)
      obj.type[x.key] = x.value;
     }
     console.log(obj)
     this.Variation.push(obj.type)
     this.product.variation.push(obj);
     console.log(this.product.variation)
     this.types.reset();
     this.inputQtn.nativeElement.value = ' ';
  }
  increaseQuantity(index:number){
    this.product.variation[index]['quantity']++;
    console.log(this.product.variation[index].quantity)
  }

  decreaseQuantity(index:number){
   if(this.product.variation[index].quantity<=0) return
    else   this.product.variation[index].quantity--;

   console.log(this.product.variation[index].quantity)
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

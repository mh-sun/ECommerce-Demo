import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/core/services/products.service';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  obj = new Object;
  addVariant = false;
  product: any = {
    isActive: true,
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0
    },
    variation: []
  };
  imageLink: string | any;
  productForm = this.fb.group({
    title: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
    variant: this.fb.array([])
  });

  constructor(
    public dialogRef: MatDialogRef<SidenavComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,private service:ProductsService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get variants() {
    return this.productForm.get('variant') as FormArray
  }

  ngOnInit(): void { }

  private addVariantGroup(): FormGroup {
    return this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  addVariants() {
    console.log('called')
    this.variants.push(this.addVariantGroup())
  }

  imagePreview(e: any) {
    let event = (e.target as HTMLInputElement).files;
    let file: any;
    if (event != null) {
      file = event[0];
      this.productForm.patchValue({
        image: file
      });
    }

    let img = this.productForm.get('image');
    if (img != null) {
      img.updateValueAndValidity()
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.imageLink = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  // addMore(input1: string, input2: string) {
  //   console.log(input1, input2);
  //   let arr = new Array(input2);

  //   Object.assign(this.obj, { [input1]: input2 })
  //   console.log(this.obj)
  //   this.productForm.patchValue({
  //     variation: this.obj
  //   });
  //   let variant = this.productForm.get('variation');
  //   console.log(variant?.value)
  //   if (variant != null) {
  //     variant.updateValueAndValidity()
  //   }
  //   this.addVariant = false;
  // }
  addMore() {
    let obj: any = {
      type: {
      },
      quantity: 0
    };
    if (this.variants.length != 0) {
      for (let x of this.variants.value) {
        console.log(x)
        obj.type[x.key] = x.value;
        obj.quantity = +x.quantity;
        this.product.variation.push(obj);
      }
    }
    this.variants.reset();
  }

  onSubmit() {
    console.log(this.productForm.value);
    let arr = ['title', 'price', 'description', 'category', 'image'];
    for (let key of arr) {
      console.log(this.productForm.get(key))
      let inputKey = this.productForm.get(key)?.value;
      this.product[key] = inputKey;
    }
    this.addMore()
    console.log(this.product);
    this.service.addProduct(this.product)
    this.dialogRef.close();
  }

}

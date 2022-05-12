import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/product.model';
import { Variation } from 'src/app/core/models/variation.model';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

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
  title: string | any;
  headerTitle: string | any;
  Variation: Variation[] | any = [];
  variation: Variation | any;
  index: number | undefined;
  variantType = true;
  public selectedFile: File | any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  imageLink: string | any;
  productForm = this.fb.group({
    title: ['', Validators.required],
    price: ['', [Validators.required, this.validate]],
    description: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
    types: this.fb.array([]),
    variant: this.fb.array([])
  });

  constructor(  public dialogRef: MatDialogRef<ProductListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder, private service: ProductsService, private httpClient: HttpClient) { }
  
  onNoClick(): void {
      this.dialogRef.close();
  }
  get variants() {
    return this.productForm.get('variant') as FormArray
  }

  ngOnInit(): void {
    this.title = 'Add Product';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
  }

  get types() {
    return this.productForm.get('types') as FormArray
  }

  changeType(index: number) {
    console.log(index)
    this.index = index;
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    const pattern = /[0-9\+\-\ ]/;
    if (control.value <= 0 || !pattern.test(control.value)) {
      return { 'priceInvalid': true };
    }
    return null;
  }

  private addVariantGroup(): FormGroup {
    return this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  private addTypeGroup(): FormGroup {
    return this.fb.group({
      moreKey: ['', Validators.required],
      moreValue: ['', Validators.required]
    });
  }

  addVariants() {
    console.log('called')
    this.variants.push(this.addVariantGroup())
  }

  removeVariant(index: number): void {
    this.variants.removeAt(index);
  }

  addType() {
    this.types.push(this.addTypeGroup())
  }

  removeType(index: number): void {
    this.types.removeAt(index);
  }

  removeVariation(index: number) {
    this.product.variation.splice(index, 1)
    this.Variation.splice(index, 1)
    console.log(this.product.variation, this.Variation)
  }


  imagePreview(e: any) {
    let event = (e.target as HTMLInputElement).files;
    this.selectedFile = e.target.files[0];

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

  increaseQuantity(index: number) {
    this.product.variation[index]['quantity']++;
    console.log(this.product.variation[index].quantity)
  }

  decreaseQuantity(index: number) {
    if (this.product.variation[index].quantity <= 0) return
    else this.product.variation[index].quantity--;
  }

  removeFormArrays() {
    for (let i = 0; i < this.variants.length; i++) {
      this.variants.removeAt(i)
    }
    for (let i = 0; i < this.types.length; i++) {
      this.types.removeAt(i)
    }
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

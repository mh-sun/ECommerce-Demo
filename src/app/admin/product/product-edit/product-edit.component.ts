import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/core/models/product.model';
import { Variation } from 'src/app/core/models/variation.model';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  
  quantity: number[] = [];
  valueArray = new Array();
  Variation: Variation[] | any = [];
  variation: Variation | any;
  index: number | undefined;
  title: string | any;
  headerTitle: string | any;
  product: Product | any;
  typeForm: FormGroup | any;
  productEditForm: FormGroup | any;
  productIdFromRoute!: number;
  variantType = true;
  notifier = new Subject();


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: ProductsService) { }

  ngOnInit(): void {
    this.title = 'Edit Product';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
    const routeParams = this.route.snapshot.paramMap;
    this.productIdFromRoute = Number(routeParams.get('id'));
    
    this.service.getOneProduct(this.productIdFromRoute).pipe(takeUntil(this.notifier)).subscribe((res) => {
      this.product = res;
     
      this.productEditForm = this.fb.group({
        title: [this.product.title,],
        price: [this.product.price, [Validators.required, this.validate]],
        description: [this.product.description,],
        category: [this.product.category,],
        image: [this.product.image,],
        types: this.fb.array([]),
        variant: this.fb.array([])
      });

      for (let variation of this.product.variation) {
        this.Variation.push(variation['type'])
        this.quantity.push(variation['quantity'])
      }

      this.product.image = this.productEditForm.get('image').value;
      
      if (Object.keys(this.Variation[0]).length === 0) {
        this.variantType = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.notifier.next(1)
    this.notifier.complete()
  }

  get variants() {
    return this.productEditForm.get('variant') as FormArray
  }

  get types() {
    return this.productEditForm.get('types') as FormArray
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
    this.variants.push(this.addVariantGroup())
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

  haveSameData(obj1: Object | any, obj2: Object | any) {
    const obj1Length = Object.keys(obj1).length;
    const obj2Length = Object.keys(obj2).length;

    if (obj1Length === obj2Length) {
      return Object.keys(obj1).every(
        key => obj2.hasOwnProperty(key)
          && obj2[key] === obj1[key]);
    }
    return false;
  }

  addMore() {
    let obj: any = {
      type: {
      },
      quantity: 0
    };
    if (this.variants.length != 0) {
      for (let x of this.variants.value) {
        obj.type[x.key] = x.value;
        obj.quantity = +x.quantity;
        if (this.productEditForm.get('types').length != 0) {
          for (let x of this.types.value) {
            obj.type[x.moreKey] = x.moreValue;
            console.log(obj.type);
          }
        }
        this.Variation.push(obj.type);
        this.product.variation.push(obj);
      }
    }
    this.variants.reset();
    for(let i=0;i<this.variants.length;i++){
      this.variants.removeAt(i);
    }
    this.types.reset();
    for(let i=0;i<this.types.length;i++){
      this.types.removeAt(i);
    }
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
    let arr = ['title', 'price', 'description', 'category', 'image'];
    for (let key of arr) {
      this.product[key] = this.productEditForm.get(key).value;
    }
    this.addMore()
    this.service.updateProduct(this.product, this.productIdFromRoute);
  }
}

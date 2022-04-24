import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/product.model';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  obj = new Object;
  addVariant = false;
  product: Product | any;
  imageLink: string | any;
  productForm = this.fb.group({
    title: [''],
    price: [''],
    description: [''],
    category: [''],
    image: [''],
    variation: ['']
  });

  constructor(
    public dialogRef: MatDialogRef<SidenavComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void { }

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

  addMore(input1: string, input2: string) {
    console.log(input1, input2);
    let arr = new Array(input2);

    Object.assign(this.obj, { [input1]: input2 })
    console.log(this.obj)
    this.productForm.patchValue({
      variation: this.obj
    });
    let variant = this.productForm.get('variation');
    console.log(variant?.value)
    if (variant != null) {
      variant.updateValueAndValidity()
    }
    this.addVariant = false;
  }

  onSubmit() {
    console.log(this.productForm.value);
    this.dialogRef.close();
  }

}

import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
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

  
  public selectedFile: File| any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;


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
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,private service:ProductsService,private httpClient:HttpClient) { }

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
//  onUpload() {

//     const uploadData: any = new FormData();
//     // const uploadData = new FormData();
//     uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
//     // uploadData.append('myFile', this.productForm.get('image')?.value);
//     // var options = { content: uploadData };
//     console.log(this.productForm.get('image')?.value,this.selectedFile)
//     // this.httpClient.post('http://localhost:3000/assets', options).subscribe((res: any) => 
//     // {
//     //   console.log(res);
//     //   this.receivedImageData = res;
//     //   this.base64Data = this.receivedImageData.pic;
//     //   this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; 
//     // });
//     // this.httpClient
//     // .post('http://localhost:3000/assets', uploadData)
//     // .subscribe({
//     //   next: (response) => console.log(response),
//     //   error: (error) => console.log(error),
//     // });
//     // this.selectedFile.inProgress = true; 
//     // this.service.upload(uploadData)
//     // let response = await fetch(' http://localhost:3000/assets', {
//     //   method: 'POST',
//     //   body: uploadData
//     // });
//     // let result = await response.json();
//     // alert(result.message);
//     this.service.upload(uploadData)

//    }
//   onUpload(){
//     const fs = require('fs');
 
// // Get the current filenames
// // before the function
// // getCurrentFilenames();
// console.log("\nFile Contents of example_file:",
//       fs.readFileSync(this.selectedFile.name, "utf8"));
 
// // Copying the file to a the same name
// fs.copyFile("example_file.txt", "copied_file.txt",
//       fs.constants.COPYFILE_EXCL, (err: any) => {
//   if (err) {
//     console.log("Error Found:", err);
//   }
//   else {
 
//     // Get the current filenames
//     // after the function
//     // getCurrentFilenames();
//     console.log("\nFile Contents of copied_file:",
//       fs.readFileSync("copied_file.txt", "utf8"));
//   }
// });
 
// // Function to get current filenames
// // in directory
// // function getCurrentFilenames() {
// //   console.log("\nCurrent filenames:");
// //   fs.readdirSync(__dirname).forEach((file: any) => {
// //     console.log(file);
// //   });
// // }
//   }
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

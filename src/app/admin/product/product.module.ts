import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { AdminModule } from '../admin.module';
import { ProductAddComponent } from './product-add/product-add.component';

@NgModule({
  declarations: [
    ProductEditComponent,
    ProductListComponent,
    ProductViewComponent,
    ProductAddComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AdminModule,
    // AddProductComponent
  ]
})
export class ProductModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AngularMaterialModule } from '../angular-material.module';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    AngularMaterialModule,
    NgxStarRatingModule,
    FormsModule
  ]
})
export class ProductModule { }

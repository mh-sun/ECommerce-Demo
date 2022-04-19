import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-view/product-view.component';
// import { PricingPipe } from '../pipes/pricing.pipe';
import { MycurrencyPipe } from '../pipes/MyCurrencyPipe';
import { AdminModule } from '../admin.module';
// import { HomeComponent } from '../home/home.component';


@NgModule({
  declarations: [
    ProductEditComponent,
    ProductListComponent,
    ProductViewComponent,
    // PricingPipe,
    MycurrencyPipe
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AdminModule
  ]
})
export class ProductModule { }

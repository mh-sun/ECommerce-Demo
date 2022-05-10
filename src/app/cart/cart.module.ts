import { NgModule } from '@angular/core';

import { CartRoutingModule } from './cart-routing.module';
import { PaymentComponent } from './payment/payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component'
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [
    CartComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  
})
export class CartModule { }

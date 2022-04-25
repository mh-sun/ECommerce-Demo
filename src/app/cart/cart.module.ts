import { NgModule } from '@angular/core';

import { CartRoutingModule } from './cart-routing.module';
import { PaymentComponent } from './payment/payment.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component'

@NgModule({
  declarations: [
    CartComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
  ],
  
})
export class CartModule { }

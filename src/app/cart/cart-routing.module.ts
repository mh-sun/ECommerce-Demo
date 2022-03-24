import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path:'payment',
    component:PaymentComponent
  },
  {
    path:'',
    component:CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }

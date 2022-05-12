import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { CartComponent } from './cart.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path:'payment/:id',
    component:PaymentComponent
  },
  {
    path:'',
    component:CartComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[]
})
export class CartRoutingModule { }

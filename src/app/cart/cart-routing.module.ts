import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { CartComponent } from './cart.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path:'payment',
    component:PaymentComponent
  },
  {
    path:'',
    component:CartComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class CartRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { OrderListComponent } from './order-list/order-list.component';
import { OrdersComponent } from './order.component';

const routes: Routes = [
  {
    path:'order-list',
    component:OrderListComponent,
    canActivate:[AuthGuard]
  },
  {
    path:':id',
    component:OrdersComponent, data: { kind: 'update' },
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

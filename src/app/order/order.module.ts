import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
import { OrdersComponent } from './order.component';
import { OrderListComponent } from './order-list/order-list.component';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    AngularMaterialModule
  ]
})
export class OrderModule { }

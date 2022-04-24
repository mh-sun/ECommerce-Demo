import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { AdminModule } from '../admin.module';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderViewComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    AngularMaterialModule,
    AdminModule
  ]
})
export class OrderModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { UserListComponent } from './user-list/user-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    HeaderComponent,
    HomeComponent,
    SidenavComponent,
    ProductEditComponent,
    AddProductComponent,
    OrderListComponent,
    OrderViewComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
  ]
})
export class AdminModule { }

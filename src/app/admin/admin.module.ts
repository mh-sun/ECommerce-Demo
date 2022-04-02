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


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    HeaderComponent,
    HomeComponent,
    SidenavComponent,
    ProductEditComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { UserListComponent } from './user-list/user-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PricingPipe } from './pipes/pricing.pipe';
import { PriceValidatorDirective } from './shared/price-validator.directive';


@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    HomeComponent,
    SidenavComponent,
    AddProductComponent,
    OrderListComponent,
    OrderViewComponent,
    UserListComponent,
    PricingPipe,
    PriceValidatorDirective
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  exports:[
    PricingPipe
  ]
})
export class AdminModule { }

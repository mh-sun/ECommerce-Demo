import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PricingPipe } from './pipes/pricing.pipe';
import { UserViewComponent } from './user-view/user-view.component';

@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    HomeComponent,
    SidenavComponent,
    UserListComponent,
    PricingPipe,
    UserViewComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  exports:[
    PricingPipe,
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

const routes: Routes = [
  { path: '', component: AdminComponent ,children:[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path:'addProduct',component:AddProductComponent},
    {path:'productList',component:DashboardComponent,children:[]},
    {path:'home',component:HomeComponent},
    {path:':id',component:ProductEditComponent},
   
    
  ]},
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

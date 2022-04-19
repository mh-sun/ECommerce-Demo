import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', component: AdminComponent ,children:[
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path:'addProduct',component:AddProductComponent},
    {path:'userList',component:UserListComponent},
    {path:'orderList',component:OrderListComponent},
    {path:'orderView/:id',component:OrderViewComponent},
    // {path:'productList',component:DashboardComponent},
    { 
      path: 'product', 
      loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
    {path:'dashboard',component:HomeComponent},
    // {path:':id',component:ProductEditComponent},

  ]},
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

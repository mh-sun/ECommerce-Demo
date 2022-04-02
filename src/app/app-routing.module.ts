import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './core/components/orders/orders.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path:'products',
    loadChildren:()=>import('./product/product.module').then(m=>m.ProductModule),
  },
  {
    path:'',
    redirectTo:'products',
    pathMatch: 'full'
  },
  {
    path:'cart',
    loadChildren:()=>import('./cart/cart.module').then(m=>m.CartModule)
  },
  { 
    path: 'product', 
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule) 
  },
  {
    path:'orders/:id',
    component:OrdersComponent, data: { kind: 'update' }
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  {
    path:'**',
    component:PageNotFoundComponent,
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

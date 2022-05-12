import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './core/components/contact/contact.component';
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
    path: 'order', 
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule) 
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) 
  },
  { 
    path: 'profile', 
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) 
  },
  {
    path:'contact',
    component:ContactComponent
  },
  {
    path:'**',
    component:PageNotFoundComponent,
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{
      onSameUrlNavigation: 'reload',
      }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

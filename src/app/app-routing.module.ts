import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path:'products',
    loadChildren:()=>import('./product/product.module').then(m=>m.ProductModule),
    canActivate:[AuthGuard]
  },
  {
    path:'',
    redirectTo:'products',
    pathMatch: 'full'
  },
  {
    path:'cart',
    component:CartComponent
  },
  { 
    path: 'product', 
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule) 
  },
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './shared/components/cart/cart.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path:'products',
    component:ProductComponent,
  },
  {
    path:'cart',
    component:CartComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'',
    redirectTo:'products',
    pathMatch: 'full'
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

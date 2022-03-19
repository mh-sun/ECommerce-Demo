import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path:'products',
    component:ProductComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'',
    redirectTo:'products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

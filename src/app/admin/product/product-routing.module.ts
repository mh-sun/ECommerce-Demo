import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductAddComponent } from './product-add/product-add.component';


const routes: Routes = [ 
  {path:'',component:ProductListComponent},
  {path:'productAdd',component:ProductAddComponent},
  {path:'productEdit/:id',component:ProductEditComponent},
  {path:'productView/:id',component:ProductViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

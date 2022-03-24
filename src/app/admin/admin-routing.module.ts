import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: AdminComponent ,children:[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path:'dashboard',component:DashboardComponent},
    {path:'home',component:HomeComponent}
  ]},
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CredentialsMismatchComponent } from './login/credentials-mismatch/credentials-mismatch.component';
import { AddIDInterceptor } from '../core/interceptors/add-id.interceptor';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    CredentialsMismatchComponent,
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AddIDInterceptor,multi:true}
  ]
})
export class AuthModule { }

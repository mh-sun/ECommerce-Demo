import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CredentialsMismatchComponent } from './login/credentials-mismatch/credentials-mismatch.component';


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
    AuthService
  ]
})
export class AuthModule { }

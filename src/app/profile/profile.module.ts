import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { AngularMaterialModule } from '../angular-material.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }

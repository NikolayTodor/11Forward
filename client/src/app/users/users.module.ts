import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { UsersRoutingModule } from './users-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';
import { ProfileGalleryComponent } from './profile/profile-gallery/profile-gallery.component';

@NgModule({
  declarations: [
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileInfoComponent,
    ProfileGalleryComponent,
  ],
  imports: [
    UsersRoutingModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    UsersComponent,
    RegisterComponent
  ]
})
export class UsersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { UsersRoutingModule } from './users-routing.module';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
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
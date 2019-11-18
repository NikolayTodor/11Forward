import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';

const userRoutes: Routes = [
  { path: 'register', component: RegisterComponent},
  // { path: 'all', component: UsersAllComponent , pathMatch: 'full'},
  // { path: ':id', component: UpdateUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}

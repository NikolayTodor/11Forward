import { ProfileFollowingResolverService } from './profile/proile-following/profile-following-resolver.service';
import { ProfileGalleryComponent } from './profile/profile-gallery/profile-gallery.component';
import { ProfileInfoResolverService } from './profile/profile-info-resolver.service';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../auth/auth.guard';
import { ProileFollowersComponent } from './profile/proile-followers/proile-followers.component';
import { ProileFollowingComponent } from './profile/proile-following/proile-following.component';
import { ProfileGalleryResolverService } from './profile/profile-gallery/profile-gallery-resolver.service';
import { ProfileFollowersResolverService } from './profile/proile-followers/profile-followers-resolver.service';
import { UsersComponent } from './users.component';

const userRoutes: Routes = [
  { path: '', component: UsersComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: ':id', component: ProfileComponent,
  resolve: { user: ProfileInfoResolverService },
  pathMatch: 'prefix',
  children: [
    {
      path: '',
      redirectTo: 'posts',
      pathMatch: 'full'
    },
    {
      path: 'posts',
      component: ProfileGalleryComponent,
      resolve: { posts: ProfileGalleryResolverService }
    },
    {
      path: 'followers',
      component: ProileFollowersComponent,
      resolve: { followers: ProfileFollowersResolverService }
    },
    {
      path: 'following',
      component: ProileFollowingComponent,
      resolve: { following: ProfileFollowingResolverService }
    }

  ],
  canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}

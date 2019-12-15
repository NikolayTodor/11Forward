import { GalleryRefreshService } from './profile/profile-gallery/gallery-refresh.service';
import { ProfileFollowersResolverService } from './profile/proile-followers/profile-followers-resolver.service';
import { ProfileGalleryResolverService } from './profile/profile-gallery/profile-gallery-resolver.service';
import { ProfileInfoResolverService } from './profile/profile-info-resolver.service';
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
import { ProileFollowersComponent } from './profile/proile-followers/proile-followers.component';
import { ProileFollowingComponent } from './profile/proile-following/proile-following.component';
import { ProfileFollowingResolverService } from './profile/proile-following/profile-following-resolver.service';
import { ProfileCardComponent } from './profile/profile-card/profile-card.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';


@NgModule({
  declarations: [
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileInfoComponent,
    ProfileGalleryComponent,
    ProileFollowersComponent,
    ProileFollowingComponent,
    ProfileCardComponent,
    ProfileEditComponent,
  ],
  imports: [
    UsersRoutingModule,
    CommonModule,
    SharedModule
  ],

  providers: [ProfileInfoResolverService,
    ProfileGalleryResolverService,
    ProfileFollowersResolverService,
    ProfileFollowingResolverService,
   GalleryRefreshService],

  exports: [
    UsersComponent,
    RegisterComponent
  ]
})
export class UsersModule { }

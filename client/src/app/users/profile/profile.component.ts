import { UpdateUserDTO } from './../../models/users/update-profile.dto';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProfileInfoService } from '../../core/services/profile-info.service';
import { LoggedUserDTO } from '../../models/users/logged-user.dto';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../core/services/user.service';
import { ShowUserProfileDTO } from '../../models/users/user-profile.dto';
import { FollowActionType } from '../../common/follow-action-types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public loggedUser: LoggedUserDTO;
  public profileInfo: ShowUserProfileDTO;
  public subscription: Subscription;


  constructor(private readonly authService: AuthService,
              private readonly usersService: UsersService,
              private readonly route: ActivatedRoute,
              private readonly profileService: ProfileInfoService,
              private readonly notificationService: NotificationService
              ) { }

  ngOnInit() {

    this.subscription = this.authService.loggedUserData$.subscribe(
      (data: LoggedUserDTO) => {
        this.loggedUser = data;
      });

    this.route.data.subscribe(({ user }) => {
      this.profileInfo = user;
    });
    this.profileService.passNewProfile(this.profileInfo);

  }

  followUnfollow(change: boolean) {
    const actionType = change ? FollowActionType.Follow : FollowActionType.Unfollow;
    const actionBody = {action: actionType};
    this.usersService.followUnfollow(this.profileInfo.username, actionBody).subscribe(
      (data) => {
        this.profileInfo = data;
        this.profileService.passNewProfile(this.profileInfo);
      }
    )
  }

  updateProfile(updateProfileInfo: UpdateUserDTO) {
    console.log(updateProfileInfo);
    this.usersService.updateProfile(updateProfileInfo, this.loggedUser.id)
    .subscribe((data) => {

      this.notificationService.success(`Profile successfully updated!`);
      this.profileInfo = data;
      this.profileService.passNewProfile(this.profileInfo);
      const currUsername: string = data.username;
      const currPassword: string = updateProfileInfo.password !== '' ?
      updateProfileInfo.password : updateProfileInfo.oldPassword;
      this.authService.logout();
      this.authService.login({credential: currUsername, password: currPassword}).subscribe((data)=>{
      });

    },
    ()=>this.notificationService.error(`Unsuccessful profile update!`));
  }
}

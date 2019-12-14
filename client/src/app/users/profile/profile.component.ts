
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

  followUnfollow(followOrUnfollow: boolean) {

    // The action type depends on if we follow or do not follow the user
    const actionType = followOrUnfollow ? FollowActionType.Follow : FollowActionType.Unfollow;
    const actionBody = {action: actionType};
    this.usersService.followUnfollow(this.profileInfo.username, actionBody).subscribe(
      (data) => {
        this.profileInfo = data;
        this.profileService.passNewProfile(this.profileInfo);
      },
      ()=> {this.notificationService.error('Unsucessful follow / unfollow action')}
    )
  }

  updateProfile(updateProfileInfo: UpdateUserDTO) {

    this.usersService.updateProfile(updateProfileInfo, this.loggedUser.id)
    .subscribe(
      (data: ShowUserProfileDTO) => {

      this.notificationService.success(`Profile successfully updated!`);

      // Updating the new profile
      this.profileInfo = data;


      // Emitting the new profile
      this.profileService.passNewProfile(this.profileInfo);

      const currUsername: string = this.profileInfo.username;

      // Check if password has been updated

      const currPassword: string = updateProfileInfo.password !== '' ?
      updateProfileInfo.password : updateProfileInfo.oldPassword;

      // Setting the new token
      this.authService.logout();
      this.authService.login({credential: currUsername, password: currPassword}).subscribe((data)=>{
      });

    },
    () => this.notificationService.error(`Unsuccessful profile update!`));
  }
}

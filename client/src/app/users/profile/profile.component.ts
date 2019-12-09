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
              private readonly profileService: ProfileInfoService
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
}

import { FollowActionType } from './../../../../../server/src/common/enums/follow-action-type';

import { LoggedUserDTO } from './../../models/logged-user.dto';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { PostsService } from '../../core/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../core/services/user.service';
import { ShowUserProfileDTO } from '../../models/user-profile.dto';

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
              private readonly postsService: PostsService,
              private readonly usersService: UsersService,
              private readonly route: ActivatedRoute,
              ) { }

  ngOnInit() {

    this.subscription = this.authService.loggedUserData$.subscribe(
      (data: LoggedUserDTO) => {
        this.loggedUser = data;
      });

    this.route.data.subscribe(({ user }) => this.profileInfo = user);

  }

  followUnfollow(change: boolean) {
    const actionType = change ? FollowActionType.Follow : FollowActionType.Unfollow;
    const actionBody = {action: actionType};
    this.usersService.followUnfollow(this.profileInfo.username, actionBody).subscribe(
      data => this.profileInfo = data
    )
  }
}


import { ShowPostDTO } from './../../models/show-post.dto';
import { LoggedUserDTO } from './../../models/logged-user.dto';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { PostsService } from '../../posts/posts.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../core/services/user.service';
import { UserFollowDTO } from '../../models/user-follow.dto';
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
  public isOwner: boolean;

  // public profilePosts: ShowPostDTO[];
  // public following: UserFollowDTO[];
  // public followers: UserFollowDTO[];

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

    if (this.loggedUser.id === this.profileInfo.id) {
        this.isOwner = true;
      } else {
        this.isOwner = false;
      }

    }

    // this.postsService.getUserPosts(this.activatedRoute.snapshot.params.id)
    //   .subscribe((data: ShowPostDTO[]) => {
    //     this.profilePosts = data;
    //   });

    // this.usersService.getUserFollowers(this.activatedRoute.snapshot.params.id)
    // .subscribe((data: UserFollowDTO[]) => {
    //   this.followers = data;
    //   console.log(data);
    // })

    // this.usersService.getUserFollowing(this.activatedRoute.snapshot.params.id)
    // .subscribe((data: UserFollowDTO[]) => {
    //   this.followers = data;
    //   console.log(data);
    // })

}

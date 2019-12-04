
import { LoggedUserDTO } from '../../models/users/logged-user.dto';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { PostsService } from '../../core/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../core/services/user.service';
import { ShowUserProfileDTO } from '../../models/users/user-profile.dto';

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
}

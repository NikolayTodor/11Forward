import { ShowPostDTO } from './../../models/show-post.dto';

import { LoggedUserDTO } from './../../models/logged-user.dto';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { PostsService } from '../../posts/posts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public loggedUser: LoggedUserDTO;
  public subscription: Subscription;
  public profilePosts: ShowPostDTO[];

  constructor(private readonly authService: AuthService,
    private readonly postsService: PostsService
              ) { }

  ngOnInit() {

    this.subscription = this.authService.loggedUserData$.subscribe(
      (loggedUser: LoggedUserDTO) => {
        this.loggedUser = loggedUser;
      });
    }
  }


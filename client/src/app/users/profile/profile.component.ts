import { ShowPostDTO } from './../../models/show-post.dto';
import { LoggedUserDTO } from './../../models/logged-user.dto';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { PostsService } from '../../posts/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public loggedUser: LoggedUserDTO;
  public subscription: Subscription;
  public profilePosts: ShowPostDTO[];
  public profileId: string;

  constructor(private readonly authService: AuthService,
              private readonly postsService: PostsService,
              private readonly activatedRoute: ActivatedRoute,
              ) { }

  ngOnInit() {

    this.subscription = this.authService.loggedUserData$.subscribe(
      (loggedUser: LoggedUserDTO) => {
        this.loggedUser = loggedUser;
      });

    this.postsService.getUserPosts(this.activatedRoute.snapshot.params.id)
      .subscribe((data: ShowPostDTO[]) => {
        this.profilePosts = data;
      });
    }
  }


import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShowPostDTO } from 'src/app/models/show-post.dto';
import { PostsService } from '../posts.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CreatePostDTO } from 'src/app/models/create-post.dto';
import { Subscription } from 'rxjs';
import { LoggedUserDTO } from '../../models/logged-user.dto';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {

  public posts: ShowPostDTO[] = [];
  public loggedUser: LoggedUserDTO;
  public subscription: Subscription;

  constructor(
    private readonly postsService: PostsService,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.subscription = this.authService.loggedUserData$.subscribe(
      (loggedUser: LoggedUserDTO) => {
        this.loggedUser = loggedUser;
      });

    if (this.loggedUser) {
      this.postsService
        .getAllPosts()
        .subscribe((data: ShowPostDTO[]) => {
          this.posts = data;
        });
    } else {
      this.postsService
        .getPublicPosts()
        .subscribe((data: ShowPostDTO[]) => {
          this.posts = data;
        });
    }
  }

  public createPost(post: CreatePostDTO): void {
    this.postsService.createPost(post).subscribe(
      (createPost: ShowPostDTO) => {
        this.posts.unshift(createPost);
        this.notificationService.success(`Post created!`);
      },
      () => this.notificationService.error(`Oops! Something went wrong!`));
  }

}

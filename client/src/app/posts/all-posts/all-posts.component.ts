import { CreatePostComponent } from '../../shared/components/create-post/create-post.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CreatePostDTO } from 'src/app/models/posts/create-post.dto';
import { Subscription } from 'rxjs';
import { LoggedUserDTO } from '../../models/users/logged-user.dto';
import { AuthService } from '../../core/services/auth.service';
import {MatDialog} from '@angular/material';
import { UpdatePostDTO } from 'src/app/models/posts/update-post.dto';
import { ShowPostDTO } from '../../models/posts/show-post.dto';


@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit, OnDestroy {

  public posts: ShowPostDTO[] = [];
  public loggedUser: LoggedUserDTO;
  public subscription: Subscription;
  public take = 5;
  public skip = 0;
  public showMore = true;

  constructor(
    private readonly postsService: PostsService,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit() {


    this.subscription = this.authService.loggedUserData$.subscribe(
      (loggedUser: LoggedUserDTO) => {
        this.loggedUser = loggedUser;
      });

    if (this.loggedUser) {
      this.postsService
        .getAllPosts(this.take, this.skip)
        .subscribe((data: ShowPostDTO[]) => {
          this.posts = data;
        });
    } else {
      this.postsService
        .getPublicPosts(this.take, this.skip)
        .subscribe((data: ShowPostDTO[]) => {
          this.posts = data;
        });
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePostComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createPost(result.data);
      }
    });
  }

  onScroll(): void {
    if (this.showMore === true) {
    this.skip += 1;

    if (this.loggedUser) {
      this.postsService
        .getAllPosts(this.take, this.skip)
        .subscribe((data: ShowPostDTO[]) => {
          this.posts = [...this.posts, ...data];
          if (data.length < this.take) {
            this.showMore = false;
          }
        });
    } else {
      this.postsService
        .getPublicPosts(this.take, this.skip)
        .subscribe((data: ShowPostDTO[]) => {
          this.posts = [...this.posts, ...data];
          if (data.length < this.take) {
            this.showMore = false;
          }
        });
      }
    }
  }

  public createPost(post: CreatePostDTO): void {

    this.postsService.createPost(post).subscribe(
      (postCreated: ShowPostDTO) => {
        this.notificationService.success(`Post created!`);
        postCreated.likesCount = 0;
        this.posts.unshift(postCreated);
      },
      () => this.notificationService.error(`Oops! Something went wrong!`));
  }

  public likePost(postId: string): void {
    this.postsService.likePost(postId).subscribe((likedPost: ShowPostDTO) => {
      const index: number = this.posts.findIndex((viewedPost) => viewedPost.id === likedPost.id);
      this.posts[index] = likedPost;
    });
  }

}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoggedUserDTO } from 'src/app/models/users/logged-user.dto';
import { Subscription } from 'rxjs';
import { ShowPostDTO } from 'src/app/models/posts/show-post.dto';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../core/services/posts.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UpdatePostDTO } from 'src/app/models/posts/update-post.dto';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-single-post-comments',
  templateUrl: './single-post-comments.component.html',
  styleUrls: ['./single-post-comments.component.scss']
})
export class SinglePostCommentsComponent implements OnInit {

  public loggedUser: LoggedUserDTO;
  public subscription: Subscription;
  public post: ShowPostDTO;
  public isPostForUpdate: boolean;

  @Output() public readonly nowUpdatePost: EventEmitter<UpdatePostDTO> = new EventEmitter();
  @Output() public deletePost: EventEmitter<string> = new EventEmitter();

  constructor(
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly postsService: PostsService,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
    private readonly dialog: MatDialog
    ) { }

  ngOnInit() {
    this.subscription = this.authService.loggedUserData$.subscribe(
      (loggedUser: LoggedUserDTO) => {
        this.loggedUser = loggedUser;
      }
    );

    this.isPostForUpdate = false;

    const postId: string = this.activatedRoute.snapshot.params[`id`];

    this.postsService
      .getPostById(postId)
      .subscribe((foundPost: ShowPostDTO) => {
        (this.post = foundPost);
      });
  }

  public turnOnOffUpdatePostForm(): void {
    if (this.isPostForUpdate === false) {
    this.isPostForUpdate = true;
    } else {
      this.isPostForUpdate = false;
    }
  }

  public updatePost(post: UpdatePostDTO): void {
    this.postsService.updatePost(post)
    .subscribe((data: ShowPostDTO) => {
      this.notificationService.success(`The post has been updated!`);
      this.post = data;
    });
  }

  public hasNewComment(): void {
    this.post.commentsCount += 1;
  }

  public onLikePost(): void {
    if (this.loggedUser) {
      this.postsService
        .likePost(this.post.id)
        .subscribe((data) => this.post = data);
      } else {
        this.notificationService.error(`Please log in to like posts and comments!`);
      }
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '70%',
      data: `Are you sure you want to delete your post? This will also delete the post's comments and likes!`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDeletePost();
      }
    });
  }

  public onDeletePost(): void {
    this.postsService
    .deletePost(this.post.id)
    .subscribe(() => this.router.navigate(['/home']));
  }

  public hasOneLessComment(): void {
    this.post.commentsCount -= 1;
  }

  navigate() {
    this.router.navigate([`users/${this.post.author.id}`]);
  }

}

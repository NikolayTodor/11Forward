import { Component, OnInit } from '@angular/core';
import { ShowCommentDTO } from 'src/app/models/show-comment-dto';
import { LoggedUserDTO } from 'src/app/models/logged-user.dto';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CreateCommentDTO } from 'src/app/models/create-comment.dto';
import { CommentsService } from '../comments.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.scss']
})
export class AllCommentsComponent implements OnInit {

  public comments: ShowCommentDTO[] = [];
  public loggedUser: LoggedUserDTO;
  public subscription: Subscription;
  public postId: string;

  constructor(
    private readonly commentsService: CommentsService,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscription = this.authService.loggedUserData$.subscribe(
      (loggedUser: LoggedUserDTO) => {
        this.loggedUser = loggedUser;
      });

    this.postId = this.activatedRoute.snapshot.params[`id`];

    if (this.loggedUser) {
      this.commentsService
        .getComments(this.postId)
        .subscribe((data: ShowCommentDTO[]) => {
          this.comments = data;
        });
    } else {
      this.commentsService
        .getComments(this.postId)
        .subscribe((data: ShowCommentDTO[]) => {
          this.comments = data;
        });
    }
  }

  public createComment(comment: CreateCommentDTO): void {
    this.commentsService.createComment(this.postId, comment).subscribe(
      (createComment: ShowCommentDTO) => {
        this.comments.unshift(createComment);
        this.notificationService.success(`Comment created!`);
      },
      () => this.notificationService.error(`Oops! Something went wrong!`));
  }

  public deleteComment(commentId: string): void {
    this.commentsService.deleteComment(commentId).subscribe(() => {
      this.notificationService.success(`Comment successfully deleted!`);
    });

    const index: number = this.comments.findIndex(comment => comment.id === commentId);
    this.comments.splice(index, 1);
  }

}

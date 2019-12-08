import { Component, OnInit } from '@angular/core';
import { ShowCommentDTO } from 'src/app/models/comments/show-comment-dto';
import { LoggedUserDTO } from 'src/app/models/users/logged-user.dto';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CreateCommentDTO } from 'src/app/models/comments/create-comment.dto';
import { CommentsService } from '../comments.service';
import { ActivatedRoute } from '@angular/router';
import { UpdateCommentDTO } from 'src/app/models/comments/update-comment.dto';

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
  public take = 5;
  public skip = 0;
  public showMore = true;

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

    this.commentsService
      .getComments(this.postId, this.take, this.skip)
      .subscribe((data: ShowCommentDTO[]) => {
        this.comments = data;
      });
    }

  onScroll(): void {
    if (this.showMore === true) {
    this.skip += 1;

    this.commentsService.getComments(this.postId, this.take, this.skip)
      .subscribe((data: ShowCommentDTO[]) => {
        this.comments = [...this.comments, ...data];
        if (data.length < this.take) {
          this.showMore = false;
        }
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

  public updateComment(comment: UpdateCommentDTO): void {
    this.commentsService.updateComment(comment).subscribe((data: ShowCommentDTO) => {
      this.notificationService.success(`The comment has been updated!`);
      const index: number = this.comments.findIndex(com => com.id === comment.id);
      this.comments.splice(index, 1, data);
    });
  }

  public likeComment(commentId: string): void {
    this.commentsService.likeComment(commentId).subscribe((likedComment: ShowCommentDTO) => {
      const index: number = this.comments.findIndex((viewedComment) => viewedComment.id === likedComment.id);
      this.comments[index] = likedComment;
    });
  }

  public deleteComment(commentId: string): void {
    this.commentsService.deleteComment(commentId).subscribe(() => {
      this.notificationService.success(`Comment successfully deleted!`);
    });

    const index: number = this.comments.findIndex(comment => comment.id === commentId);
    this.comments.splice(index, 1);
  }

}

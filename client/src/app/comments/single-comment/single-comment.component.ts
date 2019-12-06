import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShowCommentDTO } from 'src/app/models/comments/show-comment-dto';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoggedUserDTO } from 'src/app/models/users/logged-user.dto';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UpdateCommentDTO } from 'src/app/models/comments/update-comment.dto';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.scss']
})
export class SingleCommentComponent implements OnInit {

  public loggedUser: LoggedUserDTO;
  public subscription: Subscription;

  public commentToShow: ShowCommentDTO;
  public isCommentForUpdate: boolean;

  public updateCommentForm: FormGroup;

  @Output() public updateComment: EventEmitter<UpdateCommentDTO> = new EventEmitter();
  @Output() public toLikeComment: EventEmitter<string> = new EventEmitter();
  @Output() public deleteComment: EventEmitter<string> = new EventEmitter();

  @Input() public set comment(value: ShowCommentDTO) {
    this.commentToShow = { ...value };
  }

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    this.subscription = this.authService.loggedUserData$.subscribe(
      (loggedUser: LoggedUserDTO) => {
        this.loggedUser = loggedUser;
      }
    );

    this.updateCommentForm = this.formBuilder.group({
      content: ['', Validators.required]
    });

    this.isCommentForUpdate = false;
  }

  public turnOnOffUpdateCommentForm(): void {
    if (this.isCommentForUpdate === false) {
    this.isCommentForUpdate = true;
    } else {
      this.isCommentForUpdate = false;
    }
  }

  public onUpdateComment(comment: UpdateCommentDTO): void {
    comment.id = this.commentToShow.id;
    this.updateComment.emit(comment);
  }

  public onLikeComment(): void {
    this.toLikeComment.emit(this.commentToShow.id);
  }

  public onDeleteComment(): void {
    this.deleteComment.emit(this.commentToShow.id);
  }

}

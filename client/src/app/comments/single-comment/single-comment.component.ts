import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShowCommentDTO } from 'src/app/models/comments/show-comment-dto';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoggedUserDTO } from 'src/app/models/users/logged-user.dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.scss']
})
export class SingleCommentComponent implements OnInit {

  public loggedUser: LoggedUserDTO;
  public subscription: Subscription;

  public commentToShow: ShowCommentDTO;

  @Output() public deleteComment: EventEmitter<string> = new EventEmitter();

  @Input() public set comment(value: ShowCommentDTO) {
    this.commentToShow = { ...value };
  }

  constructor(private readonly authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.loggedUserData$.subscribe(
      (loggedUser: LoggedUserDTO) => {
        this.loggedUser = loggedUser;
      }
    );
  }

  public onDeleteComment(): void {
    this.deleteComment.emit(this.commentToShow.id);
  }

}

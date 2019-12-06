import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ShowPostDTO } from 'src/app/models/posts/show-post.dto';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { LoggedUserDTO } from 'src/app/models/users/logged-user.dto';
import { UpdatePostDTO } from 'src/app/models/posts/update-post.dto';

@Component({
  selector: 'app-single-post-in-list',
  templateUrl: './single-post-in-list.component.html',
  styleUrls: ['./single-post-in-list.component.scss']
})
export class SinglePostInListComponent implements OnInit {

  public loggedUser: LoggedUserDTO;
  public subscription: Subscription;

  public postToShow: ShowPostDTO;
  public isPostForUpdate: boolean;

  @Output() public readonly toUpdatePost: EventEmitter<UpdatePostDTO> = new EventEmitter();
  @Output() public readonly toLikePost: EventEmitter<string> = new EventEmitter();
  @Output() public deletePost: EventEmitter<string> = new EventEmitter();

  @Input() public set post(value: ShowPostDTO) {
    this.postToShow = { ...value };
  }

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    this.subscription = this.authService.loggedUserData$.subscribe(
      (loggedUser: LoggedUserDTO) => {
        this.loggedUser = loggedUser;
      }
    );

    this.isPostForUpdate = false;
  }

  public openSinglePost(): void {
    this.router.navigate(['posts', this.postToShow.id]);
  }

  public turnOnOffUpdatePostForm(): void {
    if (this.isPostForUpdate === false) {
    this.isPostForUpdate = true;
    } else {
      this.isPostForUpdate = false;
    }
  }

  public updatePost(post): void {
    const postToUpdate: UpdatePostDTO = {
      ...post,
    };
    console.log(post);
    this.toUpdatePost.emit(postToUpdate);
  }

  public onLikePost(): void {
    this.toLikePost.emit(this.postToShow.id);
  }

  public onDeletePost(): void {
    this.deletePost.emit(this.postToShow.id);
  }

}

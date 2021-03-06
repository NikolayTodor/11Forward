import { ProfileInfoService } from './../../../core/services/profile-info.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ShowPostDTO } from 'src/app/models/posts/show-post.dto';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { LoggedUserDTO } from 'src/app/models/users/logged-user.dto';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ShowUserProfileDTO } from '../../../models/users/user-profile.dto';

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


  @Output() public readonly toLikePost: EventEmitter<string> = new EventEmitter();

  @Input() public set post(value: ShowPostDTO) {
    this.postToShow = { ...value };
  }

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly profileInfoService: ProfileInfoService,
  ) { }

  ngOnInit() {
    this.subscription = this.authService.loggedUserData$.subscribe(
      (loggedUser: LoggedUserDTO) => {
        this.loggedUser = loggedUser;
      }
    );

    this.profileInfoService.profileInfo$.subscribe((profile: ShowUserProfileDTO) => {
      if (profile && profile.id === this.postToShow.author.id) {
        // tslint:disable-next-line: no-unused-expression
        this.postToShow.author.username === profile.username;
        this.postToShow.author.avatarURL = profile.avatarURL;
      }
    })


    this.isPostForUpdate = false;
  }

  public openSinglePost(): void {
    this.router.navigate(['posts', this.postToShow.id]);
  }

  public onLikePost(): void {
    if (this.loggedUser) {
    this.toLikePost.emit(this.postToShow.id);
    } else {
      this.notificationService.error(`Please log in to like posts and comments!`);
    }
  }

}

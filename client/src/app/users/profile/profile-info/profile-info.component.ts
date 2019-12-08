import { NotificationService } from './../../../core/services/notification.service';
import { MatDialog } from '@angular/material';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShowUserProfileDTO } from '../../../models/user-profile.dto';
import { CreatePostDTO } from '../../../models/create-post.dto';
import { PostsService } from '../../../core/services/posts.service';
import { CreatePostComponent } from '../../../shared/components/create-post/create-post.component';
import { ShowPostDTO } from '../../../models/posts/show-post.dto';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  @Input() profile: ShowUserProfileDTO;
  constructor(
    private readonly dialog: MatDialog,
    private readonly notificationService: NotificationService,
    private readonly postsService: PostsService,

  ) { }

  @Output() followUnfollow: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '100%',
      height: '100%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createPost(result.data);
      }
    });
  }

  public createPost(post: CreatePostDTO): void {

    this.postsService.createPost(post).subscribe(
      (postCreated: ShowPostDTO) => {
        this.notificationService.success(`Post created!`);
      },
      () => this.notificationService.error(`Oops! Something went wrong!`));
  }

  onClickFollowUnfollow(change: boolean) {
    this.followUnfollow.emit(change);
  }

}

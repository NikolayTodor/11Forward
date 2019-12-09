
import { UsersService } from './../../../core/services/user.service';
import { UpdateProfileDTO } from './../../../models/users/update-profile.dto';
import { GalleryRefreshService } from './../profile-gallery/gallery-refresh.service';
import { NotificationService } from './../../../core/services/notification.service';
import { MatDialog } from '@angular/material';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostsService } from '../../../core/services/posts.service';
import { CreatePostComponent } from '../../../shared/components/create-post/create-post.component';
import { ShowPostDTO } from '../../../models/posts/show-post.dto';
import { CreatePostDTO } from '../../../models/posts/create-post.dto';
import { ShowUserProfileDTO } from '../../../models/users/user-profile.dto';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

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
    private readonly usersService: UsersService,
    private readonly galleryRefresh: GalleryRefreshService

  ) { }

  @Output() followUnfollow: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {}

  openDialogEditProfile(): void {
    const dialogRef = this.dialog.open(ProfileEditComponent, {
      width: '100%',
      height: '100%'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.data) {
        this.updateProfile(result.data)
      }
    });
  }

  updateProfile(updateProfileInfo: UpdateProfileDTO) {
    this.usersService.updateProfile(updateProfileInfo, this.profile.id)
    .subscribe((data: ShowUserProfileDTO) => {
      this.notificationService.success(`Profile successfully updated!`);
      this.profile = data;
      console.log(data)
    },
    ()=>this.notificationService.error(`Unsuccessful profile update!`));
  }

   openDialogPost(): void {
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
        this.galleryRefresh.addNewPost(postCreated);
      },
      () => this.notificationService.error(`Oops! Something went wrong!`));
  }

  onClickFollowUnfollow(change: boolean) {
    this.followUnfollow.emit(change);
  }

}

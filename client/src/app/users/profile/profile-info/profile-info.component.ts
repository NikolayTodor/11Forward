
import { UsersService } from './../../../core/services/user.service';
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
import { UpdateUserDTO } from '../../../models/users/update-profile.dto';

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
  @Output() editProfile: EventEmitter<UpdateUserDTO> = new EventEmitter<UpdateUserDTO>();
  ngOnInit() {}

  openDialogEditProfile(): void {
    const dialogRef = this.dialog.open(ProfileEditComponent, {

    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.updateProfile(result.data)
      }
    });
  }

  updateProfile(updateProfileInfo: UpdateUserDTO) {

    this.editProfile.emit(updateProfileInfo);


  }

   openDialogPost(): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '50%'
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
        postCreated.likes = 0;
        this.galleryRefresh.addNewPost(postCreated);
      },
      () => this.notificationService.error(`Oops! Something went wrong!`));
  }

  onClickFollowUnfollow(change: boolean) {
    this.followUnfollow.emit(change);
  }

}


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
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { LoggedUserDTO } from '../../../models/users/logged-user.dto';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  public subscription: Subscription;
  public loggedUser: LoggedUserDTO;

  @Input() profile: ShowUserProfileDTO;

  constructor(
    private readonly dialog: MatDialog,
    private readonly notificationService: NotificationService,
    private readonly postsService: PostsService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly galleryRefresh: GalleryRefreshService,
    private readonly route: Router
  ) { }

  @Output() followUnfollow: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() editProfile: EventEmitter<UpdateUserDTO> = new EventEmitter<UpdateUserDTO>();

  ngOnInit() {
    this.subscription = this.authService.loggedUserData$.subscribe(
      (loggedUser: LoggedUserDTO) => {
        this.loggedUser = loggedUser;
      }
    );
  }

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
        postCreated.likesCount = 0;
        this.galleryRefresh.addNewPost(postCreated);
      },
      () => this.notificationService.error(`Oops! Something went wrong!`));
  }

  public onClickFollowUnfollow(change: boolean) {
    this.followUnfollow.emit(change);
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      data: 'Are you sure you want to delete your profile? This action will also delete all your posts, comments and likes!'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProfile();
      }
    });
  }

  public deleteProfile() {
    this.usersService.deleteUser(this.loggedUser.id).subscribe(() => {
      this.authService.logout();
      this.notificationService.success(`User successfully deleted!`);
      this.route.navigate(['/home']);
    });
  }

}

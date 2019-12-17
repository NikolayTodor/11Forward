import { NotificationService } from './../../../core/services/notification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { MatDialogRef } from '@angular/material';
import { CreatePostDTO } from '../../../models/posts/create-post.dto';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})

export class CreatePostComponent implements OnInit {

  public newPost: CreatePostDTO;
  public createPostForm: FormGroup;
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public showCropper = false;
  public containWithinAspectRatio = true;

  @ViewChild(ImageCropperComponent, {static: true}) imageCropper: ImageCropperComponent;

  public constructor(
    private readonly formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreatePostComponent>,
    private readonly notificationService: NotificationService
    ) { }

  ngOnInit() {
    this.createPostForm = this.formBuilder.group({
      title: [
        '',
      [Validators.minLength(2), Validators.maxLength(60), Validators.required]
    ],
      content: [
        '',
        [Validators.minLength(5), Validators.maxLength(1000), Validators.required]
    ],
      isPrivate: ['', Validators.required]
    });
  }

  fileChangeEvent(event: any): void {

    const file = event.srcElement.files[0];
    if (!file || !(/image\/(gif|jpg|jpeg|png)$/i).test(file.type) || file.size > 2000000 ) {
      this.notificationService.error('File type/size invalid!');
      return;
    }

    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.showCropper = true;
  }

  cropperReady() {}

  loadImageFailed() {
    this.notificationService.error('Image load failed!');
  }

  resetImage() {
    this.imageCropper.resetImage();
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  public createPost(post): void {
    this.newPost = {
      ...post,
      isPrivate: post.isPrivate === 'Private' ? true : false,
      base: this.croppedImage
    };
    this.closeDialog(this.newPost);
  }

  closeDialog(defData: any = null) {
    this.dialogRef.close({event: 'close', data: defData});
  }
}

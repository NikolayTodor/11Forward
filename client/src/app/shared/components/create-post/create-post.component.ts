import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
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
  public  croppedImage: any = '';
  public  showCropper = false;
  public  containWithinAspectRatio = false;

  @ViewChild(ImageCropperComponent, {static: true}) imageCropper: ImageCropperComponent;

  public constructor(private readonly formBuilder: FormBuilder,
                     public dialogRef: MatDialogRef<CreatePostComponent>) { }

  ngOnInit() {
    this.createPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      isPrivate: ['', Validators.required]
    });
  }

  fileChangeEvent(event: any): void {

    const file = event.srcElement.files[0];
    if (!file || !(/image\/(gif|jpg|jpeg|png)$/i).test(file.type) || file.size > 2000000 ) {
      console.log('File type/size invalid!');
      return;
    }


    this.imageChangedEvent = event;
}

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
}

imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
}

cropperReady() {
    console.log('Cropper ready');
}

loadImageFailed() {
    console.log('Load failed');
}

resetImage() {
    this.imageCropper.resetImage();
}

toggleContainWithinAspectRatio(){
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
}

  public createPost(post): void {
    this.newPost = {
      ...post,
      isPrivate: post.isPrivate === 'Private' ? true : false,
      imageURL: this.croppedImage
    };
    this.closeDialog(this.newPost);
  }

  closeDialog(defData: any = null){
    this.dialogRef.close({event: 'close', data: defData});
    console.log(defData);
  }
}


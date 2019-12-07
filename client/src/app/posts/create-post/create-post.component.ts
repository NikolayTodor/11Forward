import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { CreatePostDTO } from '../../models/create-post.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  public createPostForm: FormGroup;
  public imageChangedEvent: any = '';
  public  croppedImage: any = '';
  public  showCropper = false;
  public  containWithinAspectRatio = true;

  @ViewChild(ImageCropperComponent, {static: true}) imageCropper: ImageCropperComponent;

  @Output() public readonly toCreatePost: EventEmitter<any> = new EventEmitter();

  public constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      isPrivate: ['', Validators.required]
    });
  }

  fileChangeEvent(event: any): void {
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
    const postToCreate: CreatePostDTO = {
      ...post,
      isPrivate: post.isPrivate === 'Private' ? true : false,
      imageURL: this.croppedImage
    };
    this.toCreatePost.emit(postToCreate);
  }
}

// Refactoring needed. Component should be in modal form and
// closed automatically once the image creation is done

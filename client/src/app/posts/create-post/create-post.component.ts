import { SharedService } from './../../shared/services/shared.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CreatePostDTO } from '../../models/create-post.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  public createPostForm: FormGroup;
  public createPostUrl: string;
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public fileToUpload: File;


  public constructor(private readonly formBuilder: FormBuilder,
                     private readonly sharedService: SharedService) { }

  @Output() public readonly toCreatePost: EventEmitter<FormData> = new EventEmitter();

  ngOnInit() {
    this.createPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      isPrivate: ['', Validators.required]
    });
  }



  onFileChange(event) {

  this.imageChangedEvent = event;

  }

  imageCropped(event: ImageCroppedEvent) {
    const fileBeforeCrop: File = this.imageChangedEvent.target.files[0];
    this.croppedImage = event.base64;
    console.log(event.base64)
    this.fileToUpload = new File([this.croppedImage], fileBeforeCrop.name, {type: fileBeforeCrop.type});
    console.log(this.fileToUpload);
  }


  public createPost(post): void {
    // const postToCreate: CreatePostDTO = {
    //   ...post,
    //   image: this.fileToUpload,
    //   isPrivate: post.isPrivate === 'Private' ? true : false
    // };
    // this.toCreatePost.emit(postToCreate);

  //   export class CreatePostDTO {
  //     public title: string;
  //     public content: string;
  //     public image: File;
  //     public isPrivate: boolean;
  // }

    post.isPrivate = post.isPrivate === 'Private' ? true : false;

    const newPost = new FormData();
    newPost.append('title', post.tile);
    newPost.append('content', post.content);
    newPost.append('image', this.fileToUpload);
    newPost.append('isPrivate', post.isPrivate);

    this.toCreatePost.emit(newPost);

  }

}

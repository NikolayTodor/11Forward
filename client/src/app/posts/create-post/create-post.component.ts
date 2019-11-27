import { SharedService } from './../../shared/services/shared.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CreatePostDTO } from '../../models/create-post.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  public createPostForm: FormGroup;
  public createPostUrl: string;

  public constructor(private readonly formBuilder: FormBuilder,
                     private readonly sharedService: SharedService) { }

  @Output() public readonly toCreatePost: EventEmitter<CreatePostDTO> = new EventEmitter();

  ngOnInit() {
    this.createPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      isPrivate: ['', Validators.required]
    });
  }



  onFileChange(event) {

  const file = event.target.files[0];
  if (file.type !== 'image/jpeg' && file.type !== 'image/png' ) {
    console.log('You are trying to upload invalid file!');
  }

  this.sharedService.postImgAndGetUrl(file).toPromise().then((response: any) => this.createPostUrl = response.data.link);
  }


  public createPost(post): void {
    const postToCreate: CreatePostDTO = {
      ...post,
      imageURL: this.createPostUrl,
      isPrivate: post.isPrivate === 'Private' ? true : false
    };
    this.toCreatePost.emit(postToCreate);
  }
}

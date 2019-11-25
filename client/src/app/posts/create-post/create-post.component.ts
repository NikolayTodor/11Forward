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
  public constructor(private readonly formBuilder: FormBuilder) { }

  @Output() public readonly toCreatePost: EventEmitter<CreatePostDTO> = new EventEmitter();

  ngOnInit() {
    this.createPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      imageURL: ['', Validators.required],
      isPrivate: ['', Validators.required]
    });
  }

  public createPost(post): void {
    const postToCreate: CreatePostDTO = {
      ...post,
      isPrivate: post.isPrivate === 'Private' ? true : false
    };
    this.toCreatePost.emit(postToCreate);
  }
}

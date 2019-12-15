import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdatePostDTO } from '../../../models/posts/update-post.dto';
import { ShowPostDTO } from '../../../models/posts/show-post.dto';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {

  public updatePostForm: FormGroup;
  public constructor(private readonly formBuilder: FormBuilder) { }

  @Input() public postToUpdate: ShowPostDTO;
  @Output() public readonly toUpdatePost: EventEmitter<UpdatePostDTO> = new EventEmitter();

  ngOnInit() {
    this.updatePostForm = this.formBuilder.group({
      title: [
        '',
        [Validators.minLength(2), Validators.maxLength(60)]
      ],
      content: [
        '',
        [Validators.minLength(5), Validators.maxLength(1000)]
      ],
      isPrivate: ['']
    });
  }

  public updatePost(post): void {
    const updatedPost: UpdatePostDTO = {
      id: this.postToUpdate.id,
    };
    if (post.title !== '') {
      updatedPost.title = post.title;
    }
    if (post.content !== '') {
      updatedPost.content = post.content;
    }
    if (post.isPrivate !== '') {
      post.isPrivate === 'Private' ?
      updatedPost.isPrivate = true : updatedPost.isPrivate = false;
    }
    console.log(post);
    this.toUpdatePost.emit(updatedPost);
  }

}

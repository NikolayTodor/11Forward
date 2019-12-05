import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdatePostDTO } from '../../../models/posts/update-post.dto';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {

  public updatePostForm: FormGroup;
  public constructor(private readonly formBuilder: FormBuilder) { }

  @Input() public val: string;
  @Output() public readonly toUpdatePost: EventEmitter<UpdatePostDTO> = new EventEmitter();

  ngOnInit() {
    this.updatePostForm = this.formBuilder.group({
      title: [
        '',
        [Validators.minLength(2), Validators.maxLength(40)]
      ],
      content: [
        '',
        [Validators.minLength(10), Validators.maxLength(1000)]
      ],
      isPrivate: ['']
    });
  }

  public updatePost(post): void {
    const postToUpdate: UpdatePostDTO = {
      id: this.val,
    };
    if (post.title !== '') {
      postToUpdate.title = post.title;
    }
    if (post.content !== '') {
      postToUpdate.content = post.content;
    }
    if (post.isPrivate !== '') {
      post.isPrivate === 'Private' ?
      postToUpdate.isPrivate = true : postToUpdate.isPrivate = false;
    }
    console.log(post);
    this.toUpdatePost.emit(postToUpdate);
  }

}

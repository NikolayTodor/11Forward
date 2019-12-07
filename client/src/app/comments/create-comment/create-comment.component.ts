import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateCommentDTO } from 'src/app/models/comments/create-comment.dto';
import { CreatePostDTO } from 'src/app/models/posts/create-post.dto';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {

  public createCommentForm: FormGroup;
  public constructor(private readonly formBuilder: FormBuilder) { }

  @Output() public readonly toCreateComment: EventEmitter<CreateCommentDTO> = new EventEmitter();

  ngOnInit() {
    this.createCommentForm = this.formBuilder.group({
      content: ['', Validators.required]
    });
  }

  public createComment(comment: CreateCommentDTO): void {
    this.toCreateComment.emit(comment);
  }

}

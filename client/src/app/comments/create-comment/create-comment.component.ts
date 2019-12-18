import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import { CreateCommentDTO } from 'src/app/models/comments/create-comment.dto';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {

  public createCommentForm: FormGroup;
  public constructor(private readonly formBuilder: FormBuilder) { }

  public confirmErrorMatcher = {
    isErrorState: (control: FormControl): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.createCommentForm.get('comment').touched && this.createCommentForm.invalid;
      return controlInvalid || formInvalid;
    }
  };

  @Output() public readonly toCreateComment: EventEmitter<CreateCommentDTO> = new EventEmitter();

  ngOnInit() {
    this.createCommentForm = this.formBuilder.group({
      content: [
        '',
        [Validators.minLength(5), Validators.maxLength(500), Validators.required]
    ]
    });
  }

  public createComment(comment: CreateCommentDTO, formDirective: FormGroupDirective): void {
    this.toCreateComment.emit(comment);
    this.createCommentForm.reset();
    Object.keys(this.createCommentForm.controls).forEach(key => {
      this.createCommentForm.get(key).setErrors(null) ;
    });
    formDirective.resetForm();
  }

}

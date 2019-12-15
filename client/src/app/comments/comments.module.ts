import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCommentsComponent } from './all-comments/all-comments.component';
import { SharedModule } from '../shared/shared.module';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { SingleCommentComponent } from './single-comment/single-comment.component';



@NgModule({
  declarations: [
    AllCommentsComponent,
    CreateCommentComponent,
    SingleCommentComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AllCommentsComponent,
    CreateCommentComponent
  ]
})
export class CommentsModule { }

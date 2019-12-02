import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCommentsComponent } from './all-comments/all-comments.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AllCommentsComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AllCommentsComponent
  ]
})
export class CommentsModule { }

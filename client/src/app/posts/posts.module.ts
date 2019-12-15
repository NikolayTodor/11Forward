import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { SinglePostCommentsComponent } from './single-post-comments/single-post-comments.component';
import { CommentsModule } from '../comments/comments.module';


@NgModule({
  declarations: [
    AllPostsComponent,
    SinglePostCommentsComponent],
  imports: [
    CommonModule,
    SharedModule,
    CommentsModule
  ],
  exports: [AllPostsComponent]
})
export class PostsModule { }

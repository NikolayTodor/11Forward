import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { PostsService } from './posts.service';
import { CreatePostComponent } from './create-post/create-post.component';

@NgModule({
  declarations: [AllPostsComponent, CreatePostComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [PostsService],
  exports: [AllPostsComponent]
})
export class PostsModule { }

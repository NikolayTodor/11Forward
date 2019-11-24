import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { PostsService } from './posts.service';
import { SinglePostInListComponent } from './single-post-in-list/single-post-in-list.component';

@NgModule({
  declarations: [AllPostsComponent, SinglePostInListComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [PostsService],
  exports: [AllPostsComponent]
})
export class PostsModule { }

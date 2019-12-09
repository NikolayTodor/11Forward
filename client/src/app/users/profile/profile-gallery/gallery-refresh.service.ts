import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShowPostDTO } from '../../../models/posts/show-post.dto';

@Injectable()
export class GalleryRefreshService {

  private newPost = new Subject<ShowPostDTO>();

  addPost$ = this.newPost.asObservable();

  addNewPost(post: ShowPostDTO) {
    this.newPost.next(post);
  }
}

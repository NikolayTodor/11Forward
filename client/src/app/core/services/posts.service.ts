import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowPostDTO } from '../../models/posts/show-post.dto';
import { CONFIG } from '../../common/config';
import { CreatePostDTO } from '../../models/posts/create-post.dto';

@Injectable()
export class PostsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getPublicPosts(): Observable<ShowPostDTO[]> {
    return this.http.get<ShowPostDTO[]>(`${CONFIG.DOMAIN_NAME}/posts`);
  }

  public getAllPosts(): Observable<ShowPostDTO[]> {
    return this.http.get<ShowPostDTO[]>(`${CONFIG.DOMAIN_NAME}/posts/private`);
  }

  public getPostById(id: string): Observable<ShowPostDTO> {
    return this.http.get<ShowPostDTO>(`${CONFIG.DOMAIN_NAME}/posts/${id}`);
  }

  public getUserPosts(profileId: string) {
    return this.http.get<ShowPostDTO[]>(`${CONFIG.DOMAIN_NAME}/posts/profile/${profileId}`);
  }

  public createPost(post: CreatePostDTO): Observable<ShowPostDTO> {
    return this.http.post<ShowPostDTO>(`${CONFIG.DOMAIN_NAME}/posts`, post);
  }

  public deletePost(postId: string): Observable<any> {
    return this.http.delete<any>(`${CONFIG.DOMAIN_NAME}/posts/${postId}`);
  }
}

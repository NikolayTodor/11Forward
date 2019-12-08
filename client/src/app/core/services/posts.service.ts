import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowPostDTO } from '../../models/posts/show-post.dto';
import { CONFIG } from '../../common/config';
import { CreatePostDTO } from '../../models/posts/create-post.dto';
import { UpdatePostDTO } from 'src/app/models/posts/update-post.dto';

@Injectable()
export class PostsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getPublicPosts(take: number, skip: number): Observable<ShowPostDTO[]> {
    return this.http.get<ShowPostDTO[]>(`${CONFIG.DOMAIN_NAME}/posts?take=${take}&skip=${skip}`);
  }

  public getAllPosts(take: number, skip: number): Observable<ShowPostDTO[]> {
    return this.http.get<ShowPostDTO[]>(`${CONFIG.DOMAIN_NAME}/posts/private?take=${take}&skip=${skip}`);
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

  public updatePost(post: UpdatePostDTO): Observable<any> {
    return this.http.put<any>(`${CONFIG.DOMAIN_NAME}/posts/${post.id}`, post);
  }

  public likePost(postId: string): Observable<ShowPostDTO> {
    return this.http.post<ShowPostDTO>(`${CONFIG.DOMAIN_NAME}/posts/likes/${postId}`, postId);
  }

  public deletePost(postId: string): Observable<any> {
    return this.http.delete<any>(`${CONFIG.DOMAIN_NAME}/posts/${postId}`);
  }
}

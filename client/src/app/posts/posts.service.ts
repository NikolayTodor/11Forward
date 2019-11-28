import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowPostDTO } from '../models/show-post.dto';
import { CONFIG } from '../common/config';
import { CreatePostDTO } from '../models/create-post.dto';

@Injectable({
  providedIn: 'root'
})
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

  public createPost(post: FormData): Observable<any> {
    return this.http.post<any>(`${CONFIG.DOMAIN_NAME}/posts`, post);
  }
}

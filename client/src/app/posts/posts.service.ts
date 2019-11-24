import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowPostDTO } from '../models/show-post.dto';
import { CONFIG } from '../common/config';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllPosts(): Observable<ShowPostDTO[]> {
    return this.http.get<ShowPostDTO[]>(`${CONFIG.DOMAIN_NAME}/posts`);
  }
}

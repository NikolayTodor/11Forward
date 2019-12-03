import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShowCommentDTO } from '../models/show-comment-dto';
import { Observable } from 'rxjs';
import { CONFIG } from '../common/config';
import { CreateCommentDTO } from '../models/create-comment.dto';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getComments(postId: string): Observable<ShowCommentDTO[]> {
    return this.http.get<ShowCommentDTO[]>(`${CONFIG.DOMAIN_NAME}/comments/${postId}`);
  }

  public createComment(postId: string, comment: CreateCommentDTO): Observable<ShowCommentDTO> {
    return this.http.post<ShowCommentDTO>(`${CONFIG.DOMAIN_NAME}/comments/${postId}`, comment);
  }
}

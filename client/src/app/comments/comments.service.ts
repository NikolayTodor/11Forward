import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShowCommentDTO } from '../models/comments/show-comment-dto';
import { Observable } from 'rxjs';
import { CONFIG } from '../common/config';
import { CreateCommentDTO } from '../models/comments/create-comment.dto';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getComments(commentId: string): Observable<ShowCommentDTO[]> {
    return this.http.get<ShowCommentDTO[]>(`${CONFIG.DOMAIN_NAME}/comments/${commentId}`);
  }

  public createComment(commentId: string, comment: CreateCommentDTO): Observable<ShowCommentDTO> {
    return this.http.post<ShowCommentDTO>(`${CONFIG.DOMAIN_NAME}/comments/${commentId}`, comment);
  }

  public deleteComment(commentId: string): Observable<any> {
    return this.http.delete<any>(`${CONFIG.DOMAIN_NAME}/comments/${commentId}`);
  }
}

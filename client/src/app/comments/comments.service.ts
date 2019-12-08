import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShowCommentDTO } from '../models/comments/show-comment-dto';
import { Observable } from 'rxjs';
import { CONFIG } from '../common/config';
import { CreateCommentDTO } from '../models/comments/create-comment.dto';
import { UpdateCommentDTO } from '../models/comments/update-comment.dto';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getComments(commentId: string, take: number, skip: number): Observable<ShowCommentDTO[]> {
    return this.http.get<ShowCommentDTO[]>(`${CONFIG.DOMAIN_NAME}/comments/${commentId}?take=${take}&skip=${skip}`);
  }

  public createComment(postId: string, comment: CreateCommentDTO): Observable<ShowCommentDTO> {
    return this.http.post<ShowCommentDTO>(`${CONFIG.DOMAIN_NAME}/comments/${postId}`, comment);
  }

  public updateComment(comment: UpdateCommentDTO): Observable<any> {
    return this.http.put<any>(`${CONFIG.DOMAIN_NAME}/comments/${comment.id}`, comment);
  }

  public likeComment(commentId: string): Observable<ShowCommentDTO> {
    return this.http.post<ShowCommentDTO>(`${CONFIG.DOMAIN_NAME}/comments/likes/${commentId}`, commentId);
  }

  public deleteComment(commentId: string): Observable<any> {
    return this.http.delete<any>(`${CONFIG.DOMAIN_NAME}/comments/${commentId}`);
  }
}

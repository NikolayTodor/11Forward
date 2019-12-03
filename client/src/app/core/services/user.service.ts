import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserFollowDTO } from '../../models/user-follow.dto';
import { CONFIG } from '../../common/config';


@Injectable()
export class UsersService {

  constructor (private readonly http: HttpClient) {}

  public getSingleUser(userId: string): Observable<any> {
    
    return this.http.get<any>(`${CONFIG.DOMAIN_NAME}/users/${userId}`);
  }

  public getUserFollowers(userId: string): Observable<UserFollowDTO[]> {
    return this.http.get<UserFollowDTO[]>(`${CONFIG.DOMAIN_NAME}/users/followers/${userId}`);
  }

  public getUserFollowing(userId: string): Observable<UserFollowDTO[]> {
    return this.http.get<UserFollowDTO[]>(`${CONFIG.DOMAIN_NAME}/users/following/${userId}`);
  }

}
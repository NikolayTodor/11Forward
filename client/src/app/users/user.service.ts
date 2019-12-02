
import { Injectable } from '@angular/core';
import { CONFIG } from '../common/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserFollowDTO } from '../models/user-follow.dto';


@Injectable()
export class UsersService {

  constructor (private readonly http: HttpClient) {}

  public getUserFollowers(userId: string): Observable<UserFollowDTO[]> {
    return this.http.get<UserFollowDTO[]>(`${CONFIG.DOMAIN_NAME}/users/followers/${userId}`);
  }

  public getUserFollowing(userId: string): Observable<UserFollowDTO[]> {
    return this.http.get<UserFollowDTO[]>(`${CONFIG.DOMAIN_NAME}/users/following/${userId}`);
  }

}

import { ShowUserProfileDTO } from './../../models/users/user-profile.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserFollowDTO } from '../../models/users/user-follow.dto';
import { CONFIG } from '../../common/config';
import { FollowActionType } from '../../common/follow-action-types';
import { UpdateUserDTO } from '../../models/users/update-profile.dto';

@Injectable()
export class UsersService {

  constructor(private readonly http: HttpClient) {}

  public getAllUsers(take: number, skip: number): Observable<any> {
    return this.http.get<any>(`${CONFIG.DOMAIN_NAME}/users?take=${take}&skip=${skip}`);
  }

  public getSingleUser(userId: string): Observable<ShowUserProfileDTO> {
    return this.http.get<any>(`${CONFIG.DOMAIN_NAME}/users/${userId}`);
  }

  public getUserFollowers(userId: string, take: number, skip: number): Observable<UserFollowDTO[]> {
    return this.http.get<UserFollowDTO[]>(`${CONFIG.DOMAIN_NAME}/users/followers/${userId}?take=${take}&skip=${skip}`);
  }

  public getUserFollowing(userId: string, take: number, skip: number): Observable<UserFollowDTO[]> {
    return this.http.get<UserFollowDTO[]>(`${CONFIG.DOMAIN_NAME}/users/following/${userId}?take=${take}&skip=${skip}`);
  }

  public followUnfollow(username: string, actionBody: {action: FollowActionType}): Observable<ShowUserProfileDTO> {
    return this.http.patch<any>(`${CONFIG.DOMAIN_NAME}/users/follow/${username}`, actionBody);
  }

  public updateProfile(updateProfileInfo: UpdateUserDTO, profileId: string): Observable<ShowUserProfileDTO> {
    return this.http.put<ShowUserProfileDTO>(`${CONFIG.DOMAIN_NAME}/users/${profileId}`, updateProfileInfo);
  }

  public deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${CONFIG.DOMAIN_NAME}/users/${userId}`);
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShowUserProfileDTO } from '../../models/users/user-profile.dto';

@Injectable()
export class ProfileInfoService {

  private profileInfoSubject$ = new BehaviorSubject<ShowUserProfileDTO>(null);

  public get profileInfo$(): Observable<ShowUserProfileDTO> {
    return this.profileInfoSubject$.asObservable();
  }

  public passNewProfile(profile: ShowUserProfileDTO) {
    this.profileInfoSubject$.next(profile);
  }

}

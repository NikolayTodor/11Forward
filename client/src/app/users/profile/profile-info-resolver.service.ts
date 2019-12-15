import { NotificationService } from '../../core/services/notification.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UsersService } from '../../core/services/user.service';
import { ShowUserProfileDTO } from '../../models/users/user-profile.dto';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileInfoResolverService implements Resolve<ShowUserProfileDTO> {

  constructor(
    private readonly router: Router,
    private readonly usersService: UsersService,
    private readonly notificator: NotificationService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable <ShowUserProfileDTO> {
    const id = route.paramMap.get('id');
    return this.usersService.getSingleUser(id)
      .pipe(
        map(user => {
          if (user) {
            return user;
          } else {
            this.router.navigate(['/home']);
            this.notificator.error('Unable to load user profile.');
            return;
          }
        })
      );
  }
}

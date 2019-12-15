import { UsersService } from './../../../core/services/user.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../core/services/notification.service';

@Injectable()
export class ProfileFollowersResolverService implements Resolve<any> {

  constructor(
    private readonly router: Router,
    private readonly usersService: UsersService,
    private readonly notificator: NotificationService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable <any> {

    const id = route.parent.url[0].path;

    return this.usersService.getUserFollowers(id, 8, 0)
        .pipe(
          map(followers => {
            if (followers) {
              return followers;
            } else {
              this.router.navigate(['/home']);
              this.notificator.error('Unable to load followers!');
              return;
            }
          })
        );
  }
}

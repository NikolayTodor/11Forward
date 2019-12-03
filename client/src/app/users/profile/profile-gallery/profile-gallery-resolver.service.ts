import { PostsService } from './../../../core/services/posts.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../core/services/notification.service';

@Injectable()
export class ProfileGalleryResolverService implements Resolve<any> {

  constructor(
    private readonly router: Router,
    private readonly postsService: PostsService,
    private readonly notificator: NotificationService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable <any> {

    const id = route.parent.url[0].path;

    return this.postsService.getUserPosts(id)
        .pipe(
          map(posts => {
            if (posts) {
              return posts;
            } else {
              this.router.navigate(['/home']);
              this.notificator.error('Unable to load posts.');
              return;
            }
          })
        );
  }
}

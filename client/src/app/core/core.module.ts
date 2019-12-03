
import { UsersService } from './services/user.service';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { PostsService } from './services/posts.service';

@NgModule({
  providers: [
      NotificationService,
      AuthService,
      StorageService,
      UsersService,
      PostsService]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Core module is already provided!');
    }
  }
}

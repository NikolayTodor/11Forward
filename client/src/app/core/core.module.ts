
import { UsersService } from './services/user.service';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { PostsService } from './services/posts.service';
import { ProfileInfoService } from './services/profile-info.service';

@NgModule({
  providers: [
      NotificationService,
      AuthService,
      StorageService,
      UsersService,
      PostsService,
      ProfileInfoService]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Core module is already provided!');
    }
  }
}

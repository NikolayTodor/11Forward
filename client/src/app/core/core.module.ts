import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
// import { NotificationService } from './services/notiffication.service';

@NgModule({
  providers: [
    //   NotificationService,
      AuthService,
      StorageService]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Core module is already provided!');
    }
  }
}

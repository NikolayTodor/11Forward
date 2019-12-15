import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../core/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificationService: NotificationService
  ) {}

  public canActivate(): boolean {
    if (!this.authService.getLoggedUserData()) {
      this.notificationService.error(
        `You must be logged in in order to see this page!`
      );
      this.router.navigate(['users/login']);

      return false;
    }

    return true;
  }
}

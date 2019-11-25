import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoggedUserDTO } from 'src/app/models/logged-user.dto';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  public loggedUser: LoggedUserDTO;
  public subscription: Subscription;

  public constructor(
    private readonly authService: AuthService,
    private readonly notification: NotificationService,
    private readonly router: Router) {}

  public ngOnInit() {
    this.subscription = this.authService.loggedUserData$.subscribe(
      (loggedUser: LoggedUserDTO) => {
        this.loggedUser = loggedUser;
      }
    );
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public goToProfile() {
    this.router.navigate([`/users/${this.loggedUser.id}`]);
  }

  public logout() {
    this.authService.logout();
    this.notification.success('Logged out successfully');
    this.router.navigate(['/home']);
  }

}

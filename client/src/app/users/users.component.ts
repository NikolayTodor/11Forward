import { AuthService } from './../core/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoggedUserDTO } from '../models/users/logged-user.dto';
import { Subscription } from 'rxjs';
import { ShowUserProfileDTO } from '../models/users/user-profile.dto';
import { UsersService } from '../core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit , OnDestroy {

  public loggedUser: LoggedUserDTO;
  public subscription: Subscription;
  public users: ShowUserProfileDTO[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  public ngOnInit() {
    this.subscription = this.authService.loggedUserData$.subscribe(
      (loggedUser: LoggedUserDTO) => {
        this.loggedUser = loggedUser;
      }
    );
    this.usersService
        .getAllUsers()
        .subscribe((data: ShowUserProfileDTO[]) => {
          this.users = data;
        });
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

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
  public take = 8;
  public skip = 0;
  public showMore = true;

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
        .getAllUsers(this.take, this.skip)
        .subscribe((data: ShowUserProfileDTO[]) => {
          this.users = data;
        });
  }

  onScroll(): void {
    if (this.showMore === true) {
    this.skip += 1;

    this.usersService.getAllUsers(this.take, this.skip)
      .subscribe((data: ShowUserProfileDTO[]) => {
        this.users = [...this.users, ...data];
        if (data.length < this.take) {
          this.showMore = false;
        }
      });
    }
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

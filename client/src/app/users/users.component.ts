import { AuthService } from './../core/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoggedUserDTO } from '../models/users/logged-user.dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit , OnDestroy {

  public loggedUser: LoggedUserDTO;
  public subscription: Subscription;

  constructor(
    private readonly authService: AuthService
  ) { }

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

}


import { LoggedUserDTO } from './../../models/logged-user.dto';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public loggedUser: LoggedUserDTO;
  public subscription: Subscription;

  constructor(private readonly authService: AuthService
              ) { }

  ngOnInit() {

    this.subscription = this.authService.loggedUserData$.subscribe(
      (loggedUser: LoggedUserDTO) => {
        this.loggedUser = loggedUser;
        console.log(this.loggedUser);
      });

    }


  }


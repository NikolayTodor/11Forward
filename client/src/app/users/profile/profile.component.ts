import { LoggedUserDTO } from './../../models/logged-user.dto';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public loggedUser: LoggedUserDTO;
  public subscription: Subscription;

  constructor() { }

  ngOnInit() {

    

  }

}

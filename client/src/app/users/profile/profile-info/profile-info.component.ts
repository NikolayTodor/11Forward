import { LoggedUserDTO } from '../../../models/users/logged-user.dto';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  @Input() profile: LoggedUserDTO;
  constructor() { }

  ngOnInit() {
  }

}


import { Component, OnInit, Input } from '@angular/core';
import { ShowUserProfileDTO } from '../../../models/user-profile.dto';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  @Input() profile: ShowUserProfileDTO;

  @Input() isOwner: boolean;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShowUserProfileDTO } from '../../../models/user-profile.dto';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  @Input() profile: ShowUserProfileDTO;
  constructor() { }

  @Output() followUnfollow: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
  }

  onClickFollowUnfollow(change: boolean) {
    this.followUnfollow.emit(change);
  }

}

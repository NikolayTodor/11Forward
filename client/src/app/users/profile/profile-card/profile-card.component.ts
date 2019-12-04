import { ShowUserProfileDTO } from './../../../models/user-profile.dto';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  constructor(private readonly router: Router) { }

  @Input()
  public profileInfo: ShowUserProfileDTO;

  ngOnInit() {
  }

  navigate() {
    this.router.navigate([`users/${this.profileInfo.id}`]);
  }

}

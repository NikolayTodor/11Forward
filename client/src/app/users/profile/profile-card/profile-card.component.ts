import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ShowUserProfileDTO } from 'src/app/models/users/user-profile.dto';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  constructor(private readonly router: Router) { }

  @Input()
  public profileInfo: ShowUserProfileDTO;

  ngOnInit() {}

  navigate() {
    this.router.navigate([`users/${this.profileInfo.id}`]);
  }

}

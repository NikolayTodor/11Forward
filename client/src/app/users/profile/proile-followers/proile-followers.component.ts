import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFollowDTO } from 'src/app/models/users/user-follow.dto';

@Component({
  selector: 'app-proile-followers',
  templateUrl: './proile-followers.component.html',
  styleUrls: ['./proile-followers.component.scss']
})
export class ProileFollowersComponent implements OnInit {

  public profileFollowers: UserFollowDTO[];

  constructor(
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(({ followers }) => this.profileFollowers = followers);
  }

}

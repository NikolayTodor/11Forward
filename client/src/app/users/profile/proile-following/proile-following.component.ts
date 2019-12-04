import { UserFollowDTO } from './../../../models/user-follow.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proile-following',
  templateUrl: './proile-following.component.html',
  styleUrls: ['./proile-following.component.scss']
})
export class ProileFollowingComponent implements OnInit {

  public profileFollowing: UserFollowDTO[];

  constructor(
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(({ following }) => this.profileFollowing = following);
  }

}

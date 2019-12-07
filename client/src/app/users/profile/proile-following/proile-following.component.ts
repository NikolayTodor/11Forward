import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFollowDTO } from 'src/app/models/users/user-follow.dto';

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

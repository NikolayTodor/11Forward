import { UserFollowDTO } from './../../../models/user-follow.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proile-followers',
  templateUrl: './proile-followers.component.html',
  styleUrls: ['./proile-followers.component.scss']
})
export class ProileFollowersComponent implements OnInit {

  public profilePosts: UserFollowDTO[];

  constructor(
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(({ followers }) => this.profilePosts = followers);
    console.log(this.profilePosts);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFollowDTO } from 'src/app/models/users/user-follow.dto';
import { UsersService } from '../../../core/services/user.service';
import { ShowUserProfileDTO } from '../../../models/users/user-profile.dto';

@Component({
  selector: 'app-proile-followers',
  templateUrl: './proile-followers.component.html',
  styleUrls: ['./proile-followers.component.scss']
})
export class ProileFollowersComponent implements OnInit {

  public profileFollowers: UserFollowDTO[];
  public take = 8;
  public skip = 0;
  public showMore = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly usersService: UsersService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(({ followers }) => this.profileFollowers = followers);
  }

  onScroll(): void {

    if (this.showMore === true) {
    this.skip += 1;

    this.usersService
      .getUserFollowers(this.route.snapshot.parent.params.id, this.take, this.skip)
      .subscribe((data) => {
        this.profileFollowers = [...this.profileFollowers, ...data];
        if (data.length < this.take) {
          this.showMore = false;
        }
      });
    }
  }

}

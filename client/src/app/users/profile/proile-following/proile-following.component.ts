import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFollowDTO } from 'src/app/models/users/user-follow.dto';
import { UsersService } from '../../../core/services/user.service';

@Component({
  selector: 'app-proile-following',
  templateUrl: './proile-following.component.html',
  styleUrls: ['./proile-following.component.scss']
})
export class ProileFollowingComponent implements OnInit {

  public profileFollowing: UserFollowDTO[];
  public take = 8;
  public skip = 0;
  public showMore = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly usersService: UsersService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(({ following }) => this.profileFollowing = following);
  }

  onScroll(): void {

    if (this.showMore === true) {
    this.skip += 1;

    this.usersService
      .getUserFollowing(this.route.snapshot.parent.params.id, this.take, this.skip)
      .subscribe((data) => {
        this.profileFollowing = [...this.profileFollowing, ...data];
        if (data.length < this.take) {
          this.showMore = false;
        }
      });
    }
  }

}

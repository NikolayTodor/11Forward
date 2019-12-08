import { ShowPostDTO } from '../../../models/posts/show-post.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-profile-gallery',
  templateUrl: './profile-gallery.component.html',
  styleUrls: ['./profile-gallery.component.scss']
})
export class ProfileGalleryComponent implements OnInit {

  public profilePosts: ShowPostDTO[];
  public take = 5;
  public skip = 0;
  public showMore = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postsService: PostsService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(({ posts }) => this.profilePosts = posts);
    console.log(this.route.snapshot.parent.params.id);
  }

  onScroll(): void {

    if (this.showMore === true) {
    this.skip += 1;

    this.postsService
      .getUserPosts(this.route.snapshot.parent.params.id, this.take, this.skip)
      .subscribe((data: ShowPostDTO[]) => {
        this.profilePosts = [...this.profilePosts, ...data];
        if (data.length < this.take) {
          this.showMore = false;
        }
      });
    }
  }

}

import { ShowPostDTO } from '../../../models/posts/show-post.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile-gallery',
  templateUrl: './profile-gallery.component.html',
  styleUrls: ['./profile-gallery.component.scss']
})
export class ProfileGalleryComponent implements OnInit {

  public profilePosts: ShowPostDTO[];

  constructor(private readonly route: ActivatedRoute,
              ) { }

  ngOnInit() {
    this.route.data.subscribe(({ posts }) => this.profilePosts = posts);
    // subscription tuk
  }

}

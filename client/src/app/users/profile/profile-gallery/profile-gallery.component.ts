import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { ShowPostDTO } from '../../../models/show-post.dto';

@Component({
  selector: 'app-profile-gallery',
  templateUrl: './profile-gallery.component.html',
  styleUrls: ['./profile-gallery.component.scss']
})
export class ProfileGalleryComponent implements OnInit {

  // @Input()
  // public galeryPosts: ShowPostDTO[];



  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const test = this.route.snapshot.parent.url[0].path;
    console.log(test);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { ShowPostDTO } from '../../../models/show-post.dto';

@Component({
  selector: 'app-profile-gallery',
  templateUrl: './profile-gallery.component.html',
  styleUrls: ['./profile-gallery.component.scss']
})
export class ProfileGalleryComponent implements OnInit {

  @Input()
  public profilePosts: ShowPostDTO[];

  constructor() { }

  ngOnInit() {
  }

}

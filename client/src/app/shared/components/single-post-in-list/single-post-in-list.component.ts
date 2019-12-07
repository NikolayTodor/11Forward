import { Component, OnInit, Input } from '@angular/core';
import { ShowPostDTO } from 'src/app/models/posts/show-post.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-post-in-list',
  templateUrl: './single-post-in-list.component.html',
  styleUrls: ['./single-post-in-list.component.scss']
})
export class SinglePostInListComponent implements OnInit {

  public postToShow: ShowPostDTO;

  @Input() public set post(value: ShowPostDTO) {
    this.postToShow = { ...value };
  }

  constructor(
    private readonly router: Router,
  ) { }

  ngOnInit() {
  }

  public openSinglePost(): void {
    this.router.navigate(['posts', this.postToShow.id]);
  }

}

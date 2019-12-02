import { Component, OnInit, Input } from '@angular/core';
import { ShowPostDTO } from 'src/app/models/show-post.dto';

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

  constructor() { }

  ngOnInit() {
  }

}

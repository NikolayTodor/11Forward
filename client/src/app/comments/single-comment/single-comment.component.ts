import { Component, OnInit, Input } from '@angular/core';
import { ShowCommentDTO } from 'src/app/models/show-comment-dto';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.scss']
})
export class SingleCommentComponent implements OnInit {

  public commentToShow: ShowCommentDTO;

  @Input() public set comment(value: ShowCommentDTO) {
    this.commentToShow = { ...value };
  }

  constructor() {}

  ngOnInit() {
  }

}

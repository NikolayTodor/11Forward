import { Component, OnInit } from '@angular/core';
import { ShowPostDTO } from 'src/app/models/show-post.dto';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {

  public posts: ShowPostDTO[] = [];

  constructor(
    private readonly postsService: PostsService,
  ) { }

  ngOnInit() {
    this.postsService
        .getAllPosts()
        .subscribe((data: ShowPostDTO[]) => {
          this.posts = data;
        });
  }

}

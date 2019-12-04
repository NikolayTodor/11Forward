import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoggedUserDTO } from 'src/app/models/users/logged-user.dto';
import { Subscription } from 'rxjs';
import { ShowPostDTO } from 'src/app/models/posts/show-post.dto';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../core/services/posts.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-single-post-comments',
  templateUrl: './single-post-comments.component.html',
  styleUrls: ['./single-post-comments.component.scss']
})
export class SinglePostCommentsComponent implements OnInit {

  public loggedUser: LoggedUserDTO;
  public subscription: Subscription;
  public post: ShowPostDTO;

  @Output() public deletePost: EventEmitter<string> = new EventEmitter();

  constructor(
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly postsService: PostsService,
    private readonly notificationService: NotificationService,
    private readonly router: Router) { }

  ngOnInit() {
    this.subscription = this.authService.loggedUserData$.subscribe(
      (loggedUser: LoggedUserDTO) => {
        this.loggedUser = loggedUser;
      }
    );

    const postId: string = this.activatedRoute.snapshot.params[`id`];

    this.postsService
      .getPostById(postId)
      .subscribe((foundPost: ShowPostDTO) => {
        (this.post = foundPost);
      });
  }

  public onDeletePost(): void {
    this.postsService
    .deletePost(this.post.id)
    .subscribe(() => this.router.navigate(['/home']));
  }

}

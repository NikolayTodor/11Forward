import { NotificationService } from './../../../core/services/notification.service';
import { GalleryRefreshService } from './gallery-refresh.service';
import { ShowPostDTO } from '../../../models/posts/show-post.dto';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/core/services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-gallery',
  templateUrl: './profile-gallery.component.html',
  styleUrls: ['./profile-gallery.component.scss']
})
export class ProfileGalleryComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  public profilePosts: ShowPostDTO[];
  public take = 5;
  public skip = 0;
  public showMore = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postsService: PostsService,
    private readonly galleryRefresh: GalleryRefreshService,
    private readonly notificationService: NotificationService,
  ) { }

  ngOnInit() {


    this.route.data.subscribe(({ posts }) => {
      this.profilePosts = posts;
      this.subscription = this.galleryRefresh.addPost$.subscribe(
        (data: ShowPostDTO) => {
          this.profilePosts.unshift(data);
        });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  public deletePost(postId: string): void {
    this.postsService.deletePost(postId).subscribe(() => {
      this.notificationService.success(`Post successfully deleted!`);
    });

    const index: number = this.profilePosts.findIndex(post => post.id === postId);
    this.profilePosts.splice(index, 1);
  }

}

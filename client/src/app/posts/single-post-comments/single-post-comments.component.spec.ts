import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { SinglePostCommentsComponent } from './single-post-comments.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { CommentsModule } from '../../comments/comments.module';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { PostsService } from '../../core/services/posts.service';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ShowPostDTO } from '../../models/posts/show-post.dto';
import { LoggedUserDTO } from '../../models/users/logged-user.dto';
import { UpdatePostDTO } from '../../models/posts/update-post.dto';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';

describe('SinglePostCommentsComponent', () => {
    let authService;
    let activatedRoute;
    let postsService;
    let notificationService;
    let router;
    let dialog;

    let fixture: ComponentFixture<SinglePostCommentsComponent>;
    let component: SinglePostCommentsComponent;

    beforeEach(async(() => {
      jest.clearAllMocks();

      activatedRoute = {
        snapshot: {
          paramMap: {
            get: () => '1',
          },
        },
      };

      authService = {
        get loggedUserData$() {
          return of();
        },
        emitUserData() {}
      };

      postsService = {
        getPostById() {},
        updatePost() {},
        likePost() {},
        deletePost() {}
      };

      notificationService = {
        success() {},
        error() {}
      };

      router = {
        navigate() {}
      };

      dialog = {
        open() {},
        afterClosed() {}
      };

      TestBed.configureTestingModule({
        imports: [SharedModule, CommonModule, CommentsModule, RouterTestingModule],
        declarations: [SinglePostCommentsComponent],
        providers: [AuthService, PostsService, NotificationService, MatDialog]
      })
        .overrideProvider(AuthService, { useValue: authService })
        .overrideProvider(ActivatedRoute, { useValue: activatedRoute })
        .overrideProvider(PostsService, { useValue: postsService })
        .overrideProvider(NotificationService, { useValue: notificationService })
        .overrideProvider(Router, { useValue: router })
        .overrideProvider(MatDialog, { useValue: dialog })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(SinglePostCommentsComponent);
          component = fixture.componentInstance;
        });
    }));

    it('should be defined', () => {
      // Arrange & Act & Assert
      expect(component).toBeDefined();
    });

    describe('turnOnOffUpdatePostForm()', () => {
      it('should turn this.isPostForUpdateForm ON if it is OFF', () => {
        // Arrange
        component.isPostForUpdate = false;

        // Act
        component.turnOnOffUpdatePostForm();

        // Assert
        expect(component.isPostForUpdate).toBe(true);
      });

      it('should turn this.isPostForUpdateForm OFF if it is ON', () => {
        // Arrange
        component.isPostForUpdate = true;

        // Act
        component.turnOnOffUpdatePostForm();

        // Assert
        expect(component.isPostForUpdate).toBe(false);
      });
    });

    describe('updatePost()', () => {
      it('should call the postsService.updatePost() once with correct parameters', done => {
        // Arrange
        const mockedPost: ShowPostDTO = {
          id: 's',
          title: 's',
          content: 'string',
          imageURL: 'string',
          isPrivate: false,
          dateCreated: 's',
          dateLastUpdated: 's',
          author: 's',
          commentsCount: 1,
          likesCount: 1
        };

        const spy = jest
          .spyOn(postsService, 'updatePost')
          .mockReturnValue(of(mockedPost));

        const mockedPostToUpdate: UpdatePostDTO = {
          id: '1',
          title: 'title'
        };

        // Act
        component.updatePost(mockedPostToUpdate);

        // Assert
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(mockedPostToUpdate);

        done();
      });

      it('should subscribe to postsService.updatePost() observable and save emitted value when response is success', done => {
        // Arrange
        const mockedPost: ShowPostDTO = {
          id: '1',
          title: 'title',
          content: 'string',
          imageURL: 'string',
          isPrivate: false,
          dateCreated: 's',
          dateLastUpdated: 's',
          author: 's',
          commentsCount: 1,
          likesCount: 1
        };

        const spy = jest
          .spyOn(postsService, 'updatePost')
          .mockReturnValue(of(mockedPost));

        const mockedPostToUpdate: ShowPostDTO = {
          id: '2',
          title: 'testtitle',
          content: 'string',
          imageURL: 'string',
          isPrivate: false,
          dateCreated: 's',
          dateLastUpdated: 's',
          author: 's',
          commentsCount: 1,
          likesCount: 1
        };

        component.post = mockedPostToUpdate;

        const mockedUpdatePostData = {
          id: '2',
          title: 'testtitle'
      };

        // Act
        component.updatePost(mockedUpdatePostData as any);

        // Assert
        expect(component.post).toEqual(mockedPost);

        done();
      });

      it('should display notificationService.success message when the response is successful', done => {
        // Arrange
        const mockedPost: ShowPostDTO = {
          id: '1',
          title: 'title',
          content: 'string',
          imageURL: 'string',
          isPrivate: false,
          dateCreated: 's',
          dateLastUpdated: 's',
          author: 's',
          commentsCount: 1,
          likesCount: 1
        };

        const successSpy = jest.spyOn(notificationService, 'success');

        const spy = jest
          .spyOn(postsService, 'updatePost')
          .mockReturnValue(of(mockedPost));

        const mockedPostToUpdate: ShowPostDTO = {
          id: '2',
          title: 'testtitle',
          content: 'string',
          imageURL: 'string',
          isPrivate: false,
          dateCreated: 's',
          dateLastUpdated: 's',
          author: 's',
          commentsCount: 1,
          likesCount: 1
        };

        component.post = mockedPostToUpdate;

        const mockedUpdatePostData = {
          id: '2',
          title: 'testtitle'
      };

        // Act
        component.updatePost(mockedUpdatePostData as any);

        // Assert
        expect(successSpy).toBeCalledTimes(1);
        expect(successSpy).toBeCalledWith('The post has been updated!');

        done();
      });
    });

    describe('hasNewComment()', () => {
      it(' should increase the post.commentsCount by 1', () => {
      // Arrange
      component.post = {
        id: 's',
        title: 's',
        content: 'string',
        imageURL: 'string',
        isPrivate: false,
        dateCreated: 's',
        dateLastUpdated: 's',
        author: 's',
        commentsCount: 1,
        likesCount: 1
      };

      // Act
      component.hasNewComment();

      // Assert
      expect(component.post.commentsCount).toEqual(2);
      });
    });

    describe('onLikePost()', () => {
      it('should call notificationService.error with the correct message if there is no loggedUser', done => {
        // Arrange
        const mockedPost: ShowPostDTO = {
          id: 's',
          title: 's',
          content: 'string',
          imageURL: 'string',
          isPrivate: false,
          dateCreated: 's',
          dateLastUpdated: 's',
          author: 's',
          commentsCount: 1,
          likesCount: 1
        };

        const spy = jest
          .spyOn(notificationService, 'error')
          .mockReturnValue(of('mocked like return value'));

        // Act
        component.post = mockedPost;
        component.onLikePost();

        // Assert
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith('Please log in to like posts and comments!');

        done();
      });

      it('should call the postsService.likePost() once with correct parameters when there is a loggedUser', done => {
        // Arrange
        const mockedPost: ShowPostDTO = {
          id: 's',
          title: 's',
          content: 'string',
          imageURL: 'string',
          isPrivate: false,
          dateCreated: 's',
          dateLastUpdated: 's',
          author: 's',
          commentsCount: 1,
          likesCount: 1
        };

        const mockedUserData: LoggedUserDTO = {
                id: '1',
                username: 'pesho',
                isDeleted: false,
              };

        const spy = jest
          .spyOn(postsService, 'likePost')
          .mockReturnValue(of(mockedPost));

        // Act
        component.post = mockedPost;
        component.loggedUser = mockedUserData;
        component.onLikePost();

        // Assert
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(mockedPost.id);

        done();
      });

      it('should subscribe to postsService.likePost() observable and save emitted value when response is success', done => {
        // Arrange
        const mockedPost: ShowPostDTO = {
          id: 's',
          title: 's',
          content: 'string',
          imageURL: 'string',
          isPrivate: false,
          dateCreated: 's',
          dateLastUpdated: 's',
          author: 's',
          commentsCount: 1,
          likesCount: 1
        };

        const mockedUserData: LoggedUserDTO = {
                id: '1',
                username: 'pesho',
                isDeleted: false,
              };

        const spy = jest
          .spyOn(postsService, 'likePost')
          .mockReturnValue(of(mockedPost));

        // Act
        component.post = mockedPost;
        component.loggedUser = mockedUserData;
        component.onLikePost();

        // Assert
        expect(component.post).toEqual(mockedPost);

        done();
      });
    });

    describe('confirmDelete()', () => {
      it('open ConfirmationDialogComponent correctly', done => {
        // Arrange

        const modalConfigs = {
          width: '70%',
          data: `Are you sure you want to delete your post? This will also delete the post's comments and likes!`
        };

        const spy = jest.spyOn(dialog, 'open')
            .mockImplementation(() => ({
                afterClosed() { return of('mock'); }
            }));

        jest.spyOn(component, 'onDeletePost')
            .mockImplementation(() => of('mock'));

        // Act
        component.confirmDelete();

        // Assert
        expect(spy).toBeCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(ConfirmationDialogComponent, modalConfigs);

        done();
      });

      it('not call this.onDeletePost() if dialog returns undefined after closing', done => {
        // Arrange

        const modalConfigs = {
          width: '70%',
          data: `Are you sure you want to delete your post? This will also delete the post's comments and likes!`
        };

        jest.spyOn(dialog, 'open')
            .mockImplementation(() => ({
                afterClosed() { return of(undefined); }
            }));

        const spy = jest.spyOn(component, 'onDeletePost')
            .mockImplementation(() => of('mock'));

        // Act
        component.confirmDelete();

        // Assert
        expect(spy).toBeCalledTimes(0);

        done();
      });

      it('call this.onDeletePost() once if dialog returns a result after closing', done => {
        // Arrange

        const modalConfigs = {
          width: '70%',
          data: `Are you sure you want to delete your post? This will also delete the post's comments and likes!`
        };

        jest.spyOn(dialog, 'open')
            .mockImplementation(() => ({
                afterClosed() { return of('mock'); }
            }));

        const spy = jest.spyOn(component, 'onDeletePost')
            .mockImplementation(() => of('mock'));

        // Act
        component.confirmDelete();

        // Assert
        expect(spy).toBeCalledTimes(1);

        done();
      });
    });

    describe('onDeletePost()', () => {
      it('should call the postsService.deletePost() with the correct parameter', done => {
        // Arrange
        const mockedPost: ShowPostDTO = {
          id: 's',
          title: 's',
          content: 'string',
          imageURL: 'string',
          isPrivate: false,
          dateCreated: 's',
          dateLastUpdated: 's',
          author: 's',
          commentsCount: 1,
          likesCount: 1
        };

        const spy = jest
          .spyOn(postsService, 'deletePost')
          .mockReturnValue(of(mockedPost));

        // Act
        component.post = mockedPost;
        component.onDeletePost();

        // Assert
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(mockedPost.id);

        done();
      });

      it('should call router.navigate() once with correct message when the login is successful', done => {
        // Arrange
        const mockedPost: ShowPostDTO = {
          id: 's',
          title: 's',
          content: 'string',
          imageURL: 'string',
          isPrivate: false,
          dateCreated: 's',
          dateLastUpdated: 's',
          author: 's',
          commentsCount: 1,
          likesCount: 1
        };

        const spy = jest
          .spyOn(postsService, 'deletePost')
          .mockReturnValue(of('mocked return value'));

        const navigateSpy = jest.spyOn(router, 'navigate');

        // Act
        component.post = mockedPost;
        component.onDeletePost();

        // Assert
        expect(navigateSpy).toBeCalledTimes(1);
        expect(navigateSpy).toBeCalledWith(['/home']);

        done();
      });
    });

    describe('hasOneLessComment()', () => {
        it(' should decrease the post.commentsCount by 1', () => {
        // Arrange
        component.post = {
          id: 's',
          title: 's',
          content: 'string',
          imageURL: 'string',
          isPrivate: false,
          dateCreated: 's',
          dateLastUpdated: 's',
          author: 's',
          commentsCount: 1,
          likesCount: 1
        };

        // Act
        component.hasOneLessComment();

        // Assert
        expect(component.post.commentsCount).toEqual(0);
        });
    });
});

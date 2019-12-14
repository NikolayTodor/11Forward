import { UsersService } from './../../core/services/user.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileComponent } from './profile.component';
import { of } from 'rxjs';
import { ActivatedRoute, Routes } from '@angular/router';
import { NotificationService } from './../../core/services/notification.service';
import { ProfileInfoService } from './../../core/services/profile-info.service';
import { SharedModule } from '../../shared/shared.module';
import { LoggedUserDTO } from '../../models/users/logged-user.dto';
import { ProfileInfoResolverService } from './profile-info-resolver.service';
import { ProfileGalleryResolverService } from './profile-gallery/profile-gallery-resolver.service';
import { ProfileFollowersResolverService } from './proile-followers/profile-followers-resolver.service';
import { ProfileFollowingResolverService } from './proile-following/profile-following-resolver.service';
import { GalleryRefreshService } from './profile-gallery/gallery-refresh.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UsersModule } from '../users.module';
import { PostsModule } from '../../posts/posts.module';
import { CommentsModule } from '../../comments/comments.module';
import { CoreModule } from '../../core/core.module';


describe('ProfileComponent', () => {
  let authService;
  let usersService;
  let notificationService;
  let profileInfoService;
  let route;

  let fixture: ComponentFixture<ProfileComponent>;
  let component: ProfileComponent;

  beforeEach(async(() => {
    jest.clearAllMocks();

    authService = {
      get loggedUserData$() { return of(); }
    };

    route = {
      data: of({user: {}})
    };

    usersService = {
      followUnfollow() {}
    };

    notificationService = {
      error() {}
    };

    profileInfoService = {
      passNewProfile() {}
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        CoreModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        UsersModule,
        PostsModule,
        CommentsModule],

      declarations: [
      ],
      providers: [ProfileInfoResolverService,
        ProfileGalleryResolverService,
        ProfileFollowersResolverService,
        ProfileFollowingResolverService,
        GalleryRefreshService,
        UsersService,
        NotificationService,
        ProfileInfoService],

    })
      .overrideProvider(AuthService, { useValue: authService })
      .overrideProvider(UsersService, { useValue: usersService })
      .overrideProvider(ActivatedRoute, {useValue: route})
      .overrideProvider(NotificationService, {useValue: notificationService})
      .overrideProvider(ProfileInfoService, {useValue: profileInfoService})
      .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
});


  describe('ngOnInit should', () => {

  it('should subscribe to the loggedUserData$ observable and save the emitted value', ()  => {
      // Arrange
      const mockedUserData: LoggedUserDTO = {
        id : 'testUserId',
        username : 'testUserUsername',
        isDeleted: false
      };

      const spy = jest
      .spyOn(authService, 'loggedUserData$', 'get')
      .mockReturnValue(of(mockedUserData));

      // Act
      component.ngOnInit();

      // Assert
      expect(component.loggedUser).toEqual(mockedUserData);
      spy.mockClear();

  });

});

  it('should call loggedUserData$ once', () => {
    // Arrange
      // Arrange
      const mockedUserData: LoggedUserDTO = {
        id : 'testUserId',
        username : 'testUserUsername',
        isDeleted: false
      };

      const spy = jest
      .spyOn(authService, 'loggedUserData$', 'get')
      .mockReturnValue(of(mockedUserData));

    // Act
      component.ngOnInit();

    // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockClear();
  });

  it('should initialize correctly with the data passed from the resolver', () => {

    const user = {
       id: '1',
       username: 'Niki',
      avatarURL: 'mockUrl',
      email: 'mockMail',
      followersCount: 1,
      followingCount: 1,
      isFollowed: false,
      isOwner: true
    };

    // change the activated route's data per test
    route.data = of({ user });

    component.ngOnInit();

    expect(component.profileInfo).toEqual(user);

  });

});


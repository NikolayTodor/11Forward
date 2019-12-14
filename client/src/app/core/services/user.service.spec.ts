import { async, TestBed } from '@angular/core/testing';
import { UsersService } from './user.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CONFIG } from '../../common/config';
import { of } from 'rxjs';
import { FollowActionType } from '../../common/follow-action-types';

describe('UserService', () => {
  let httpClient;

  let service: UsersService;

  beforeEach(async (() => {
    jest.clearAllMocks();

    httpClient = {
      get() {},
      put() {},
      patch() {},
      delete() {}
    };

    TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [UsersService]
      })
      .overrideProvider(HttpClient, {
        useValue: httpClient
      });

    service = TestBed.get(UsersService);
  }));

  it('should be defined', () => {
    // Arrange & Act & Assert
    expect(service).toBeDefined();
  });

  describe('getAllUsers()', () => {
    it('should call the http.get() method once with correct parameters', done => {
      // Arrange
      const mockTake = 5;
      const mockSkip = 5;

      const url = `${CONFIG.DOMAIN_NAME}/users?take=${mockTake}&skip=${mockSkip}`;

      const spy = jest
        .spyOn(httpClient, 'get')
        .mockReturnValue( of ('mock'));

      // Act & Assert
      service.getAllUsers(mockTake, mockSkip).subscribe(() => {
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(url);

        done();
      });
    });

    it('should return the http.get() method return value', done => {
      // Arrange
      const mockTake = 5;
      const mockSkip = 5;

      const url = `${CONFIG.DOMAIN_NAME}/users?take=${mockTake}&skip=${mockSkip}`;

      const spy = jest
        .spyOn(httpClient, 'get')
        .mockReturnValue( of ('mock'));

      // Act & Assert
      service.getAllUsers(mockTake, mockSkip).subscribe((returnValue: any) => {
        expect(returnValue).toEqual('mock');

        done();
      });
    });
  });

  describe('getSingleUser()', () => {
    it('should call the http.get() method once with correct parameter', done => {
      // Arrange
      const userId = 'id';

      const url = `${CONFIG.DOMAIN_NAME}/users/${userId}`;

      const spy = jest
        .spyOn(httpClient, 'get')
        .mockReturnValue( of ('mock'));

      // Act & Assert
      service.getSingleUser(userId).subscribe(() => {
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(url);

        done();
      });
    });

    it('should return the http.get() method return value', done => {
      // Arrange
      const userId = 'id';

      const url = `${CONFIG.DOMAIN_NAME}/users/${userId}`;

      const spy = jest
        .spyOn(httpClient, 'get')
        .mockReturnValue( of ('mock'));

      // Act & Assert
      service.getSingleUser(userId).subscribe((returnValue: any) => {
        expect(returnValue).toEqual('mock');

        done();
      });
    });
  });

  describe('getUserFollowers()', () => {
    it('should call the http.get() method once with correct parameters', done => {
      // Arrange
      const userId = 'userId';
      const mockTake = 5;
      const mockSkip = 5;

      const url = `${CONFIG.DOMAIN_NAME}/users/followers/${userId}?take=${mockTake}&skip=${mockSkip}`;

      const spy = jest
        .spyOn(httpClient, 'get')
        .mockReturnValue( of ('mock'));

      // Act & Assert
      service.getUserFollowers(userId, mockTake, mockSkip).subscribe(() => {
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(url);

        done();
      });
    });

    it('should return the http.get() method return value', done => {
      // Arrange
      const userId = 'userId';
      const mockTake = 5;
      const mockSkip = 5;

      const url = `${CONFIG.DOMAIN_NAME}/users/followers/${userId}?take=${mockTake}&skip=${mockSkip}`;

      const spy = jest
        .spyOn(httpClient, 'get')
        .mockReturnValue( of ('mock'));

      // Act & Assert
      service.getUserFollowers(userId, mockTake, mockSkip).subscribe((returnValue: any) => {
        expect(returnValue).toEqual('mock');

        done();
      });
    });
  });

  describe('getUserFollowing()', () => {
    it('should call the http.get() method once with correct parameters', done => {
        // Arrange
        const userId = 'userId';
        const mockTake = 5;
        const mockSkip = 5;

        const url = `${CONFIG.DOMAIN_NAME}/users/following/${userId}?take=${mockTake}&skip=${mockSkip}`;

        const spy = jest
          .spyOn(httpClient, 'get')
          .mockReturnValue( of ('mock'));

        // Act & Assert
        service.getUserFollowing(userId, mockTake, mockSkip).subscribe(() => {
          expect(spy).toBeCalledTimes(1);
          expect(spy).toBeCalledWith(url);

          done();
        });
    });

    it('should return the http.get() method return value', done => {
        // Arrange
        const userId = 'userId';
        const mockTake = 5;
        const mockSkip = 5;

        const url = `${CONFIG.DOMAIN_NAME}/users/following/${userId}?take=${mockTake}&skip=${mockSkip}`;

        const spy = jest
          .spyOn(httpClient, 'get')
          .mockReturnValue( of ('mock'));

        // Act & Assert
        service.getUserFollowing(userId, mockTake, mockSkip).subscribe((returnValue: any) => {
          expect(returnValue).toEqual('mock');

          done();
        });
    });
  });

  describe('followUnfollow()', () => {
    it('should call the http.patch() method once with correct parameters', done => {
        // Arrange
        const username = 'username';
        const actionBody = { action: FollowActionType.Follow };

        const url = `${CONFIG.DOMAIN_NAME}/users/follow/${username}`;

        const spy = jest
          .spyOn(httpClient, 'patch')
          .mockReturnValue( of ('mock'));

        // Act & Assert
        service.followUnfollow(username, actionBody).subscribe(() => {
          expect(spy).toBeCalledTimes(1);
          expect(spy).toBeCalledWith(url, actionBody);

          done();
        });
    });

    it('should return the http.patch() method return value', done => {
        // Arrange
        const username = 'username';
        const actionBody = { action: FollowActionType.Follow };

        const url = `${CONFIG.DOMAIN_NAME}/users/follow/${username}`;

        const spy = jest
          .spyOn(httpClient, 'patch')
          .mockReturnValue( of ('mock'));

        // Act & Assert
        service.followUnfollow(username, actionBody).subscribe((returnValue: any) => {
            expect(returnValue).toEqual('mock');

            done();
        });
    });
  });

  describe('updateProfile()', () => {
    it('should call the http.put() method once with correct parameters', done => {
        // Arrange
        const updateUser = {username: 'username'};
        const profileId = 'id';

        const url = `${CONFIG.DOMAIN_NAME}/users/${profileId}`;

        const spy = jest
          .spyOn(httpClient, 'put')
          .mockReturnValue( of ('mock'));

        // Act & Assert
        service.updateProfile(updateUser, profileId).subscribe(() => {
          expect(spy).toBeCalledTimes(1);
          expect(spy).toBeCalledWith(url, updateUser);

          done();
        });
    });

    it('should return the http.put() method return value', done => {
        // Arrange
        const updateUser = {username: 'username'};
        const profileId = 'id';

        const url = `${CONFIG.DOMAIN_NAME}/users/${profileId}`;

        const spy = jest
          .spyOn(httpClient, 'put')
          .mockReturnValue( of ('mock'));

        // Act & Assert
        service.updateProfile(updateUser, profileId).subscribe((returnValue: any) => {
            expect(returnValue).toEqual('mock');

            done();
        });
    });
  });

  describe('deleteUser()', () => {
    it('should call the http.delete() method once with correct parameter', done => {
        // Arrange
        const userId = 'id';

        const url = `${CONFIG.DOMAIN_NAME}/users/${userId}`;

        const spy = jest
          .spyOn(httpClient, 'delete')
          .mockReturnValue( of ('mock'));

        // Act & Assert
        service.deleteUser(userId).subscribe(() => {
          expect(spy).toBeCalledTimes(1);
          expect(spy).toBeCalledWith(url);

          done();
        });
      });

    it('should return the http.delete() method return value', done => {
        // Arrange
        const userId = 'id';

        const url = `${CONFIG.DOMAIN_NAME}/users/${userId}`;

        const spy = jest
          .spyOn(httpClient, 'delete')
          .mockReturnValue( of ('mock'));

        // Act & Assert
        service.deleteUser(userId).subscribe((returnValue: any) => {
          expect(returnValue).toEqual('mock');

          done();
        });
      });
  });

});

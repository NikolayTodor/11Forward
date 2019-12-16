import { CONFIG } from '../../common/config';
import { AuthService } from './auth.service';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from './storage.service';
import { of, combineLatest } from 'rxjs';
import { UserRegisterDTO } from '../../models/users/user-register.dto';
import { UserLoginDTO } from '../../models/users/user-login.dto';
import { LoggedUserDTO } from '../../models/users/logged-user.dto';

describe('AuthService', () => {
  let httpClient;
  let storageService;
  let jwtService;

  let service: AuthService;

  beforeEach(async (() => {
    jest.clearAllMocks();

    httpClient = {
      post() {},
      delete() {}
    };

    storageService = {
      getItem() {},
      setItem() {},
      removeItem() {}
    };

    jwtService = {
      isTokenExpired() {},
      decodeToken() {}
    };

    TestBed.configureTestingModule({
        imports: [HttpClientModule, JwtModule.forRoot({
          config: {}
        })],
        providers: [AuthService, StorageService]
      })
      .overrideProvider(HttpClient, {
        useValue: httpClient
      })
      .overrideProvider(StorageService, {
        useValue: storageService
      })
      .overrideProvider(JwtHelperService, {
        useValue: jwtService
      });

    service = TestBed.get(AuthService);
  }));

  it('should be defined', () => {
    // Arrange & Act & Assert
    expect(service).toBeDefined();
  });

  describe('register()', () => {
    it('should call the http.post() method once with correct parameters', done => {
      // Arrange
      const url = `${CONFIG.DOMAIN_NAME}/users`;

      const mockedUserCredentials: UserRegisterDTO = {
        username: 'pesho',
        email: 'email@email.com',
        password: 'password'
      };

      const mockedUserData = 'mocked user data';

      // Mock this in order to initialize the loggedUserDataSubject$
      const getItemSpy = jest
        .spyOn(storageService, 'getItem')
        .mockReturnValue(undefined);

      const spy = jest
        .spyOn(httpClient, 'post')
        .mockReturnValue( of (mockedUserData));

      // Act & Assert
      service.register(mockedUserCredentials).subscribe(() => {
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(url, mockedUserCredentials);

        done();
      });
    });

    it('should return the http.post() method return value', done => {
      // Arrange
      const mockedUserCredentials: UserRegisterDTO = {
        username: 'pesho',
        email: 'email@email.com',
        password: 'password'
      };

      const mockedUserData = 'mocked user data';

      // Mock this in order to initialize the loggedUserDataSubject$
      const getItemSpy = jest
        .spyOn(storageService, 'getItem')
        .mockReturnValue(undefined);

      const spy = jest
        .spyOn(httpClient, 'post')
        .mockReturnValue( of (mockedUserData));

      // Act & Assert
      service.register(mockedUserCredentials).subscribe((returnValue: any) => {
        expect(returnValue).toEqual(mockedUserData);

        done();
      });
    });
  });

  describe('login()', () => {
    it('should call the http.post() method once with correct parameters', done => {
      // Arrange
      const url = `${CONFIG.DOMAIN_NAME}/session`;

      const mockedUserCredentials: UserLoginDTO = {
        credential: 'pesho',
        password: 'password'
      };

      const fakeToken = {
        token: 'fake token'
      };
      const mockedUserData = 'mocked user data';

      // Mock this in order to initialize the loggedUserDataSubject$
      const getItemSpy = jest
        .spyOn(storageService, 'getItem')
        .mockReturnValue(undefined);

      const postSpy = jest
        .spyOn(httpClient, 'post')
        .mockReturnValue( of (fakeToken));

      const setItemSpy = jest.spyOn(storageService, 'setItem');

      const decodeTokenSpy = jest
        .spyOn(jwtService, 'decodeToken')
        .mockReturnValue(mockedUserData);

      // Act & Assert
      service.login(mockedUserCredentials).subscribe(() => {
        expect(postSpy).toBeCalledTimes(1);
        expect(postSpy).toBeCalledWith(url, mockedUserCredentials);

        done();
      });
    });

    it('should call the storage.setItem() method once with correct token', done => {
      // Arrange
      const url = `${CONFIG.DOMAIN_NAME}/session`;

      const mockedUserCredentials: UserLoginDTO = {
        credential: 'pesho',
        password: 'password'
      };

      const fakeToken = {
        token: 'fake token'
      };
      const mockedUserData = 'mocked user data';

      // Mock this in order to initialize the loggedUserDataSubject$
      const getItemSpy = jest
        .spyOn(storageService, 'getItem')
        .mockReturnValue(undefined);

      const postSpy = jest
        .spyOn(httpClient, 'post')
        .mockReturnValue( of (fakeToken));

      const setItemSpy = jest.spyOn(storageService, 'setItem');

      const decodeTokenSpy = jest
        .spyOn(jwtService, 'decodeToken')
        .mockReturnValue(mockedUserData);

      // Act & Assert
      service.login(mockedUserCredentials).subscribe(() => {
        expect(setItemSpy).toBeCalledTimes(1);
        expect(setItemSpy).toBeCalledWith('token', fakeToken.token);

        done();
      });
    });

    it('should call the jwtService.decodeToken() method once with correct token', done => {
      // Arrange
      const url = `${CONFIG.DOMAIN_NAME}/session`;

      const mockedUserCredentials: UserLoginDTO = {
        credential: 'pesho',
        password: 'password'
      };

      const fakeToken = {
        token: 'fake token'
      };
      const mockedUserData = 'mocked user data';

      // Mock this in order to initialize the loggedUserDataSubject$
      const getItemSpy = jest
        .spyOn(storageService, 'getItem')
        .mockReturnValue(undefined);

      const postSpy = jest
        .spyOn(httpClient, 'post')
        .mockReturnValue( of (fakeToken));

      const setItemSpy = jest.spyOn(storageService, 'setItem');

      const decodeTokenSpy = jest
        .spyOn(jwtService, 'decodeToken')
        .mockReturnValue(mockedUserData);

      // Act & Assert
      service.login(mockedUserCredentials).subscribe(() => {
        expect(decodeTokenSpy).toBeCalledTimes(1);
        expect(decodeTokenSpy).toBeCalledWith(fakeToken.token);

        done();
      });
    });

    it('should emit the decoded user data from the internal subject', done => {
      // Arrange
      const url = `${CONFIG.DOMAIN_NAME}/session`;

      const mockedUserCredentials: UserLoginDTO = {
        credential: 'pesho',
        password: 'password'
      };

      const fakeToken = {
        token: 'fake token'
      };
      const mockedUserData = 'mocked user data';

      // Mock this in order to initialize the loggedUserDataSubject$
      const getItemSpy = jest
        .spyOn(storageService, 'getItem')
        .mockReturnValue(undefined);

      const postSpy = jest
        .spyOn(httpClient, 'post')
        .mockReturnValue( of (fakeToken));

      const setItemSpy = jest.spyOn(storageService, 'setItem');

      const decodeTokenSpy = jest
        .spyOn(jwtService, 'decodeToken')
        .mockReturnValue(mockedUserData);

      // Act
      service.login(mockedUserCredentials).subscribe();

      // Assert
      service.loggedUserData$.subscribe(data => {
        expect(data).toEqual(mockedUserData);

        done();
      });
    });

    it('should return the http.post() method return value', done => {
      // Arrange
      const url = `${CONFIG.DOMAIN_NAME}/session`;

      const mockedUserCredentials: UserLoginDTO = {
        credential: 'pesho',
        password: 'password'
      };

      const fakeToken = {
        token: 'fake token'
      };
      const mockedUserData = 'mocked user data';

      // Mock this in order to initialize the loggedUserDataSubject$
      const getItemSpy = jest
        .spyOn(storageService, 'getItem')
        .mockReturnValue(undefined);

      const postSpy = jest
        .spyOn(httpClient, 'post')
        .mockReturnValue( of (fakeToken));

      const setItemSpy = jest.spyOn(storageService, 'setItem');

      const decodeTokenSpy = jest
        .spyOn(jwtService, 'decodeToken')
        .mockReturnValue(mockedUserData);

      // Act & Assert
      service.login(mockedUserCredentials).subscribe((returnValue: any) => {
        expect(returnValue).toEqual(fakeToken);

        done();
      });
    });
  });

  describe('logout()', () => {

    it('should call the storage.removeItem() method once with correct parameter when the response is successful', done => {
      // Arrange
      const mockedLogoutReturnValue = 'Logged out successfully!';

      // Mock this in order to initialize the loggedUserDataSubject$
      const getItemSpy = jest
        .spyOn(storageService, 'getItem')
        .mockReturnValue(undefined);

      const deleteSpy = jest
        .spyOn(httpClient, 'delete')
        .mockReturnValue( of (mockedLogoutReturnValue));

      const removeItemSpy = jest.spyOn(storageService, 'removeItem');

      // Act & Assert
      service.logout();

      expect(removeItemSpy).toBeCalledTimes(1);
      expect(removeItemSpy).toBeCalledWith('token');

      done();

    });

  });

  describe('getLoggedUserData()', () => {
    it('should call the storage getItem() method once with correct token', done => {
      // Arrange
      const getItemSpy = jest
        .spyOn(storageService, 'getItem');

      // Act & Assert
      service.getLoggedUserData();
      expect(getItemSpy).toBeCalledTimes(1);
      expect(getItemSpy).toBeCalledWith('token');

      done();
    });

    it('should call the jwtService.isTokenExpired() method once with correct token if the token exists', () => {
      // Arrange
      const mockedUserData: LoggedUserDTO = {
        id: '1',
        username: 'pesho',
        isDeleted: true
      };

      const fakeToken = 'fake token';

      const getItemSpy = jest
        .spyOn(storageService, 'getItem')
        .mockReturnValue(fakeToken);

      const removeItemSpy = jest.spyOn(storageService, 'removeItem');

      const isTokenExpiredSpy = jest
        .spyOn(jwtService, 'isTokenExpired')
        .mockReturnValue(false);

      const decodeTokenSpy = jest
        .spyOn(jwtService, 'decodeToken')
        .mockReturnValue(mockedUserData);

      // Act
      service.getLoggedUserData();

      // Assert
      expect(isTokenExpiredSpy).toBeCalledTimes(1);
      expect(isTokenExpiredSpy).toBeCalledWith(fakeToken);
    });

    it('should call the storage.removeItem() method once with correct parameter if the token exists as is expired', () => {
      // Arrange
      const mockedUserData: LoggedUserDTO = {
        id: '1',
        username: 'pesho',
        isDeleted: true
      };

      const fakeToken = 'fake token';

      const getItemSpy = jest
        .spyOn(storageService, 'getItem')
        .mockReturnValue(fakeToken);

      const removeItemSpy = jest.spyOn(storageService, 'removeItem');

      const isTokenExpiredSpy = jest
        .spyOn(jwtService, 'isTokenExpired')
        .mockReturnValue(true);

      const decodeTokenSpy = jest
        .spyOn(jwtService, 'decodeToken')
        .mockReturnValue(mockedUserData);

      // Act
      service.getLoggedUserData();

      // Assert
      expect(removeItemSpy).toBeCalledTimes(1);
      expect(removeItemSpy).toBeCalledWith('token');
    });

    it('should call the jwtService.decodeToken() method once with correct parameter if the token exists as is not expired', () => {
      // Arrange
      const mockedUserData: LoggedUserDTO = {
        id: '1',
        username: 'pesho',
        isDeleted: true
      };

      const fakeToken = 'fake token';

      const getItemSpy = jest
        .spyOn(storageService, 'getItem')
        .mockReturnValue(fakeToken);

      const removeItemSpy = jest.spyOn(storageService, 'removeItem');

      const isTokenExpiredSpy = jest
        .spyOn(jwtService, 'isTokenExpired')
        .mockReturnValue(false);

      const decodeTokenSpy = jest
        .spyOn(jwtService, 'decodeToken')
        .mockReturnValue(mockedUserData);

      // Act
      service.getLoggedUserData();

      // Assert
      expect(decodeTokenSpy).toBeCalledTimes(1);
      expect(decodeTokenSpy).toBeCalledWith(fakeToken);
    });

    it('should return the value of jwtService.decodeToken() if the token exists as is not expired', () => {
      // Arrange
      const mockedUserData: LoggedUserDTO = {
        id: '1',
        username: 'pesho',
        isDeleted: true
      };

      const fakeToken = 'fake token';

      const getItemSpy = jest
        .spyOn(storageService, 'getItem')
        .mockReturnValue(fakeToken);

      const removeItemSpy = jest.spyOn(storageService, 'removeItem');

      const isTokenExpiredSpy = jest
        .spyOn(jwtService, 'isTokenExpired')
        .mockReturnValue(false);

      const decodeTokenSpy = jest
        .spyOn(jwtService, 'decodeToken')
        .mockReturnValue(mockedUserData);

      // Act
      const returnValue = service.getLoggedUserData();

      // Assert
      expect(returnValue).toEqual(mockedUserData);
    });

    it('should null if the token does not exist', () => {
      // Arrange
      const mockedUserData: LoggedUserDTO = {
        id: '1',
        username: 'pesho',
        isDeleted: true
      };

      const getItemSpy = jest
        .spyOn(storageService, 'getItem')
        .mockReturnValue(null);

      const removeItemSpy = jest.spyOn(storageService, 'removeItem');

      const isTokenExpiredSpy = jest
        .spyOn(jwtService, 'isTokenExpired')
        .mockReturnValue(false);

      const decodeTokenSpy = jest
        .spyOn(jwtService, 'decodeToken')
        .mockReturnValue(mockedUserData);

      // Act
      const returnValue = service.getLoggedUserData();

      // Assert
      expect(returnValue).toEqual(null);
    });

    it('should null if the token exists but is expired', () => {
      // Arrange
      const mockedUserData: LoggedUserDTO = {
        id: '1',
        username: 'pesho',
        isDeleted: true
      };

      const fakeToken = 'fake token';

      const getItemSpy = jest
        .spyOn(storageService, 'getItem')
        .mockReturnValue(fakeToken);

      const removeItemSpy = jest.spyOn(storageService, 'removeItem');

      const isTokenExpiredSpy = jest
        .spyOn(jwtService, 'isTokenExpired')
        .mockReturnValue(true);

      const decodeTokenSpy = jest
        .spyOn(jwtService, 'decodeToken')
        .mockReturnValue(mockedUserData);

      // Act
      const returnValue = service.getLoggedUserData();

      // Assert
      expect(returnValue).toEqual(null);
    });
  });

});

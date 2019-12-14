import { PostsService } from './posts.service';
import { async, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CONFIG } from '../../common/config';
import { of } from 'rxjs';

describe('UserService', () => {
  let httpClient;

  let service: PostsService;

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
        providers: [PostsService]
      })
      .overrideProvider(HttpClient, {
        useValue: httpClient
      });

    service = TestBed.get(PostsService);
  }));

  it('should be defined', () => {
    // Arrange & Act & Assert
    expect(service).toBeDefined();
  });

  describe('getPublicPosts', () => {
    it('should call the http.get() method once with correct parameters', (done) => {
      // Arrange
      const mockTake = 5;
      const mockSkip = 5;

      const url = `${CONFIG.DOMAIN_NAME}/posts?take=${mockTake}&skip=${mockSkip}`;

      const spy = jest
        .spyOn(httpClient, 'get')
        .mockReturnValue(of('mock'));


      // Act & Assert
      service.getPublicPosts(mockTake, mockSkip).subscribe(() => {
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(url);

        done();
      });
    });

    it('should return the http.get method return value', (done) => {

      const mockTake = 5;
      const mockSkip = 5;

      const url = `${CONFIG.DOMAIN_NAME}/posts?take=${mockTake}&skip=${mockSkip}`;

      const spy = jest
        .spyOn(httpClient, 'get')
        .mockReturnValue(of('mock'));


      // Act & Assert
      service.getPublicPosts(mockTake, mockSkip).subscribe((returnValue: any) => {
        expect(returnValue).toBe('mock');
        done();
      });

  });
    describe('getAllPosts', () => {
      it('should call the http.get() method once with correct parameters', (done) => {

        const mockTake = 5;
        const mockSkip = 5;

        const url = `${CONFIG.DOMAIN_NAME}/posts/private?take=${mockTake}&skip=${mockSkip}`;

        const spy = jest
        .spyOn(httpClient, 'get')
        .mockReturnValue(of('mock'));

        service.getAllPosts(mockTake, mockSkip).subscribe(() => {
          expect(spy).toBeCalledTimes(1);
          expect(spy).toBeCalledWith(url);

          done();
        });
      });

      it('should return the http.get() method return value', (done) => {

        const mockTake = 5;
        const mockSkip = 5;

        const url = `${CONFIG.DOMAIN_NAME}/posts/private?take=${mockTake}&skip=${mockSkip}`;

        const spy = jest
        .spyOn(httpClient, 'get')
        .mockReturnValue(of('mock'));

        service.getAllPosts(mockTake, mockSkip).subscribe((returnValue: any) => {
          expect(returnValue).toBe('mock');
          done();
        });


      });
  });

    describe('getPostById', () => {
    it('should call the http.get() method once with correct parameters', (done) => {

      const mockId = 'id1';
      const mockValue = 'mock';
      const url = `${CONFIG.DOMAIN_NAME}/posts/${mockId}`;

      const spy = jest
        .spyOn(httpClient, 'get')
        .mockReturnValue(of(mockValue));

      service.getPostById(mockId).subscribe(() => {
        expect(spy).toBeCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(url);

        done();
      });

    });

    it('should return the value from http.get()', (done)=>{
      const mockId = 'id1';
      const mockValue = 'mock';
      const url = `${CONFIG.DOMAIN_NAME}/posts/${mockId}`;

      const spy = jest
        .spyOn(httpClient, 'get')
        .mockReturnValue(of(mockValue));

      service.getPostById(mockId).subscribe((returnValue: any) => {
        expect(returnValue).toBe('mock');
        done();
      });
    })

  });

});

});

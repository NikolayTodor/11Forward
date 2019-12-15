import { PostsService } from './posts.service';
import { async, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CONFIG } from '../../common/config';
import { of } from 'rxjs';
import { CreatePostDTO } from '../../models/posts/create-post.dto';

describe('UserService', () => {
  let httpClient;

  let service: PostsService;

  beforeEach(async (() => {
    jest.clearAllMocks();

    httpClient = {
      get() {},
      put() {},
      post() {},
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

    it('should return the value from http.get()', (done) => {
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
    });

  });

    describe('getUsersPosts', () => {
    it('should call http.get with the correct parameters', (done) => {

      const mockProfileId = 'profileId';
      const mockTake = 5;
      const mockSkip = 5;
      const mockValue = 'mock';

      const url = `${CONFIG.DOMAIN_NAME}/posts/profile/${mockProfileId}?take=${mockTake}&skip=${mockSkip}`;

      const spy = jest
        .spyOn(httpClient, 'get')
        .mockReturnValue(of(mockValue));

      service.getUserPosts(mockProfileId, mockTake, mockSkip).subscribe(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(url);
        done();
      });

    });
  });

    it('should get the return value of http.get', (done) => {

    const mockProfileId = 'profileId';
    const mockTake = 5;
    const mockSkip = 5;
    const mockValue = 'mock';

    const spy = jest
      .spyOn(httpClient, 'get')
      .mockReturnValue(of(mockValue));

    service.getUserPosts(mockProfileId, mockTake, mockSkip).subscribe((returnValue: any) => {
      expect(returnValue).toBe(mockValue);
      done();
    });

  });
});

  describe('createPost', () => {
  it('should call http.post with the correct parameters', (done) => {

    const mockCreatePost = new CreatePostDTO();
    const mockValue = 'mock';
    const url = `${CONFIG.DOMAIN_NAME}/posts`;

    const spy = jest
      .spyOn(httpClient, 'post')
      .mockReturnValue(of(mockValue));

    service.createPost(mockCreatePost).subscribe(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(url, mockCreatePost);
      done();
    });
  });

  it('should get the return value of http.post', (done) => {

    const mockCreatePost = new CreatePostDTO();
    const mockValue = 'mock';

    const spy = jest
      .spyOn(httpClient, 'post')
      .mockReturnValue(of(mockValue));

    service.createPost(mockCreatePost).subscribe((returnValue: any) => {
      expect(returnValue).toBe(mockValue);
      done();
    });
  });

});

  describe('updatePost', () => {
  it('should call http.put with the correct parameters', (done) => {


    const mockPost = {id: '1'};
    const mockValue = 'mock';

    const url = `${CONFIG.DOMAIN_NAME}/posts/${mockPost.id}`;

    const spy = jest
      .spyOn(httpClient, 'put')
      .mockReturnValue(of(mockValue));

    service.updatePost(mockPost).subscribe(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(url, mockPost);
      done();
    });

  });

  it('should get the return value of http.put', (done) => {


    const mockPost = {id: '1'};
    const mockValue = 'mock';

    const spy = jest
      .spyOn(httpClient, 'put')
      .mockReturnValue(of(mockValue));

    service.updatePost(mockPost).subscribe((returnValue: any) => {
      expect(returnValue).toBe('mock');
      done();
    });

  });

  describe('likePost', () => {
    it('should call http.post with the correct parameter', (done) => {

      const mockPostId = 'postId';
      const mockValue = 'mock';

      const url = `${CONFIG.DOMAIN_NAME}/posts/likes/${mockPostId}`;

      const spy =  jest
        .spyOn(httpClient, 'post')
        .mockReturnValue(of(mockValue));

      service.likePost(mockPostId).subscribe(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(url, mockPostId);

        done();
      });

    });

    it('should get the return value of http.post()', (done) => {

      const mockPostId = 'postId';
      const mockValue = 'mock';

      const url = `${CONFIG.DOMAIN_NAME}/posts/likes/${mockPostId}`;

      const spy =  jest
        .spyOn(httpClient, 'post')
        .mockReturnValue(of(mockValue));

      service.likePost(mockPostId).subscribe((returnValue: any) => {
        expect(returnValue).toBe('mock');
        done();
      });

    });
  });

  describe('deletePost', () => {
    it('should call http.delete() with the correct parameter', (done) => {

      const mockPostId = 'postId';
      const mockValue = 'mock';

      const url = `${CONFIG.DOMAIN_NAME}/posts/${mockPostId}`;

      const spy =  jest
        .spyOn(httpClient, 'delete')
        .mockReturnValue(of(mockValue));


      service.deletePost(mockPostId).subscribe(() => {
          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith(url);

          done();
        });
    });

    it('should receive the response from http.delete()', (done) => {

      const mockPostId = 'postId';
      const mockValue = 'mock';

      const url = `${CONFIG.DOMAIN_NAME}/posts/${mockPostId}`;

      const spy =  jest
        .spyOn(httpClient, 'delete')
        .mockReturnValue(of(mockValue));


      service.deletePost(mockPostId).subscribe((returnValue: any) => {
          expect(returnValue).toBe(mockValue);
          done();
        });

    });

  });

});

});


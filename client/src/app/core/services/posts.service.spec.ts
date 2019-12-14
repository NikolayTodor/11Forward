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

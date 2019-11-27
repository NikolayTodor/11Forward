import { CONFIG } from 'src/app/common/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class SharedService {

  constructor ( private readonly http: HttpClient) {
  }

  postImgAndGetUrl(file) {
    return this.http.post(`${CONFIG.IMGUR_URL}`, file);
  }
}


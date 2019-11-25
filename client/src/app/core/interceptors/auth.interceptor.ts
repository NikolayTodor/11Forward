import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(private readonly storage: StorageService) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.storage.getItem('token');

    const updatedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(updatedReq);
  }
}

import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CONFIG } from 'src/app/common/config';
import { UserRegisterDTO } from 'src/app/models/users/user-register.dto';
import { LoggedUserDTO } from 'src/app/models/users/logged-user.dto';
import { UserLoginDTO } from 'src/app/models/users/user-login.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isLoggedInSubject$ = new BehaviorSubject<boolean>(
    this.isUserLoggedIn()
  );

  private readonly loggedInSubject$ = new BehaviorSubject<LoggedUserDTO>(
    this.getLoggedUserData()
  );

  public constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService,
    private readonly jwtService: JwtHelperService,
    ) {}

  public get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject$.asObservable();
  }

  public get loggedUserData$(): Observable<LoggedUserDTO> {
    return this.loggedInSubject$.asObservable();
  }
  public register(user: UserRegisterDTO): Observable<any> {
    return this.http.post<any>(`${CONFIG.DOMAIN_NAME}/users`, user);
  }

  public login(user: UserLoginDTO): Observable<any> {
    return this.http.post<any>(`${CONFIG.DOMAIN_NAME}/session`, user).
    pipe(tap(( { token } ) => {
      this.storage.setItem('token', token);
      const decodedUser: LoggedUserDTO = this.jwtService.decodeToken(token);
      this.loggedInSubject$.next(decodedUser);

    }));
  }

  public logout(): void {
      this.storage.removeItem('token');
      this.loggedInSubject$.next(null);
      this.isLoggedInSubject$.next(false);
      
  }

  public getLoggedUserData(): LoggedUserDTO {
    const token: string = this.storage.getItem('token');

    if (token && this.jwtService.isTokenExpired(token)) {
      this.storage.removeItem('token');
      return null;
    }

    return token ? this.jwtService.decodeToken(token) : null;
  }

  private isUserLoggedIn(): boolean {
    return !!this.storage.getItem('token');
  }

}

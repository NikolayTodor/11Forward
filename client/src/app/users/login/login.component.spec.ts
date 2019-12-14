import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { UserLoginDTO } from '../../models/users/user-login.dto';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
    let authService;
    let notificationService;
    let router;

    let fixture: ComponentFixture<LoginComponent>;
    let component: LoginComponent;

    beforeEach(async(() => {
      jest.clearAllMocks();

      authService = {
        login() {}
      };

      notificationService = {
        success() {},
        error() {}
      };

      router = {
        navigate() {}
      };

      TestBed.configureTestingModule({
        imports: [RouterTestingModule, ReactiveFormsModule, SharedModule],
        declarations: [LoginComponent],
        providers: [AuthService, NotificationService]
      })
        .overrideProvider(AuthService, { useValue: authService })
        .overrideProvider(NotificationService, { useValue: notificationService })
        .overrideProvider(Router, { useValue: router })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(LoginComponent);
          component = fixture.componentInstance;
        });
    }));

    it('should be defined', () => {
      // Arrange & Act & Assert
      expect(component).toBeDefined();
    });

    describe('login()', () => {
      it('should call authService.login() once with correct parameters', () => {
        // Arrange
        const mockedCredential = 'credential';
        const mockedPassword = 'password';
        const mockedUser: UserLoginDTO = {
          credential: mockedCredential,
          password: mockedPassword
        };

        const loginSpy = jest
          .spyOn(authService, 'login')
          .mockReturnValue(of('mocked login return value'));

        // Act
        component.login(mockedCredential, mockedPassword);

        // Assert
        expect(loginSpy).toBeCalledTimes(1);
        expect(loginSpy).toBeCalledWith(mockedUser);
      });

      it('should call notificationService.success() once with correct message when the login is successful', () => {
        // Arrange
        const mockedCredential = 'credential';
        const mockedPassword = 'password';

        const loginSpy = jest
          .spyOn(authService, 'login')
          .mockReturnValue(of('mocked login return value'));

        const successSpy = jest.spyOn(notificationService, 'success');

        // Act
        component.login(mockedCredential, mockedPassword);

        // Assert
        expect(successSpy).toBeCalledTimes(1);
        expect(successSpy).toBeCalledWith('Login successful!');
      });

      it('should call router.navigate() once with correct message when the login is successful', () => {
        // Arrange
        const mockedCredential = 'credential';
        const mockedPassword = 'password';

        const loginSpy = jest
          .spyOn(authService, 'login')
          .mockReturnValue(of('mocked login return value'));

        const successSpy = jest.spyOn(notificationService, 'success');
        const navigateSpy = jest.spyOn(router, 'navigate');

        // Act
        component.login(mockedCredential, mockedPassword);

        // Assert
        expect(navigateSpy).toBeCalledTimes(1);
        expect(navigateSpy).toBeCalledWith(['/home']);
      });

      it('should call notificationService.error() once with correct message when the login failed', () => {
        // Arrange
        const mockedCredential = 'credential';
        const mockedPassword = 'password';
        const mockData = {error: {error: 'error'}};

        const loginSpy = jest
          .spyOn(authService, 'login')
          .mockReturnValue(throwError(mockData));

        const errorSpy = jest.spyOn(notificationService, mockData.error.error);

        // Act
        component.login(mockedCredential, mockedPassword);

        // Assert
        expect(errorSpy).toBeCalledTimes(1);
        expect(errorSpy).toBeCalledWith(mockData.error.error);
      });
    });
  });

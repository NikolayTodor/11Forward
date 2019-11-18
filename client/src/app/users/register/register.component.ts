import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegisterDTO } from 'src/app/models/user-register.dto';
import { NotificationService } from 'src/app/core/services/notification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  public username: string;
  public email: string;
  public password: string;

  public constructor(
    private readonly authService: AuthService,
    private readonly notification: NotificationService,
    private readonly router: Router ,
    private readonly formBuilder: FormBuilder) { }


    public ngOnInit() {
      this.registerForm = this.formBuilder.group({
        username: [
          '',
          [Validators.required, Validators.minLength(2)]
        ],
        password: [
          '',
          [Validators.required, Validators.minLength(6), Validators.maxLength(50)]
        ],
        email: [
          '',
          [Validators.required, Validators.email]
        ],
      });
    }

  public register(user: UserRegisterDTO) {
    this.authService.register(user).subscribe(
      () => {
      this.notification.success('Registered successfully!!!');
      this.router.navigate(['home']);
    },
    () => {
      this.notification.error('Registration failed!');
    }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroupDirective } from '@angular/forms';
import { UserRegisterDTO } from 'src/app/models/user-register.dto';
import { NotificationService } from 'src/app/core/services/notification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public constructor(
    private readonly authService: AuthService,
    private readonly notification: NotificationService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder) { }
  public registerForm: FormGroup;

  public username: string;
  public email: string;
  public password: string;
  public password2: string;

  public confirmErrorMatcher = {
    isErrorState: (control: FormControl, registerForm: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.registerForm.get('password').touched && this.registerForm.invalid;
      return controlInvalid || formInvalid;
    }
  };

  public passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    return formGroup.get('password').value === formGroup.get('password2').value ?
      null : { passwordMismatch: true };
  }


    public ngOnInit() {
      this.registerForm = this.formBuilder.group({
        username: [
          '',
          [Validators.required, Validators.minLength(2), Validators.maxLength(20)]
        ],
        password: [
          '',
          [Validators.required, Validators.minLength(6), Validators.maxLength(50)]
        ],
        password2: ['', [Validators.required]],
        email: [
          '',
          [Validators.required, Validators.email]
        ]
      }, { validators: this.passwordMatchValidator });
    }

  public register(user: UserRegisterDTO) {
    this.authService.register(user).subscribe(
      () => {
      this.notification.success('Registered successfully!!!');
      this.router.navigate(['users/login']);
    },
    (data) => {
      console.log(data);
      this.notification.error(data);
    }
    );
  }
}

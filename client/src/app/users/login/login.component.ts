import { Component, OnInit } from '@angular/core';
import { UserLoginDTO } from 'src/app/models/user-login.dto';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;

  public constructor(
    private readonly authService: AuthService,
    private readonly notification: NotificationService,
    private readonly router: Router ) { }


    public ngOnInit() {
    }

    public login(credential: string, password: string) {
    const user: UserLoginDTO = {credential, password };
    this.authService.login(user).subscribe(
      () => {
      this.notification.success('Login successful!');
      this.router.navigate(['/home']);
    },
    (data) => {
      this.notification.error(`${data.error.message}`);
    }
    );
  }

}

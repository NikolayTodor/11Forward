import { Component, OnInit } from '@angular/core';
import { UserLoginDTO } from 'src/app/models/user-login.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // public credential: string;
  // public password: string;

  // public constructor(
  //   private readonly authService: AuthService,
  //   private readonly notification: NotificationService,
  //   private readonly userService: UsersService,
  //   private readonly router: Router ) { }


    public ngOnInit() {
    }

  //   public login(credential, password) {
  //   const user: UserLoginDTO = {credential, password };
  //   this.authService.login(user).subscribe(
  //     () => {
  //     this.notification.success('Login successful!');
  //   },
  //   (data) => {
  //     console.log(data.error);
  //     this.notification.error(`${data.error.message}`);
  //   }
  //   );
  // }

}

import { AuthUserDTO } from './../models/users/auth-user.dto';
import { ApiSystemError } from './../common/exceptions/api-system.error';
import { UsersDataService } from './../users/users-data.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ShowUserDTO } from 'src/models/users/show-user.dto';

@Injectable()
export class AuthService {
  private readonly blacklist: string[] = [];

    public constructor(
        private readonly userDataService: UsersDataService,
        private readonly jwtService: JwtService,
      ) {}
      public async login(user: AuthUserDTO): Promise<any> {
        const foundUser: ShowUserDTO = await this.userDataService.findUserByCredential(
          user.credential,
        );

        if (!foundUser) {
          throw new ApiSystemError(
            'User with such username does not exist!',
            400,
          );
        }
        if (!(await this.userDataService.validateUserPassword(user))) {
          throw new ApiSystemError('Invalid password!', 400);
        }

        const payload: ShowUserDTO = { ...foundUser };

        return {
          token: await this.jwtService.signAsync(payload),
        };
      }

      public blacklistToken(token: string): void {
        this.blacklist.push(token);
      }

      public isTokenBlacklisted(token: string): boolean {
        return this.blacklist.includes(token);
      }

}

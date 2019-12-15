import { ShowUserDTO } from './../../models/users/show-user.dto';
import { UsersDataService } from './../../users/users-data.service';
import { ConfigService } from './../../config/config.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly userDataService: UsersDataService,
        configservice: ConfigService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: configservice.jwtSecret,
          ignoreExpiration: false
        });
      }

      public async validate(payload: ShowUserDTO): Promise<ShowUserDTO> {
        const user = await this.userDataService.findUserByCredential(
          payload.username,
        );

        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      }
}

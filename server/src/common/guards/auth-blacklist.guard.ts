import {
    Injectable,
    CanActivate,
    ExecutionContext,
    BadRequestException,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuardWithBlacklisting extends AuthGuard('jwt')
implements CanActivate {
    public constructor(private readonly authService: AuthService) {
        super();
    }

    public async canActivate(context: ExecutionContext): Promise < boolean > {
        if (!(await super.canActivate(context))) {
            return false;
        }

        const request: Request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;

        if (this.authService.isTokenBlacklisted(token)) {
            throw new BadRequestException('You have logged out. Please log back in to do that!');
        }

        return true;
    }
}

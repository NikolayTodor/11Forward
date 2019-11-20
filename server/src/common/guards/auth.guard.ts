import {
    Injectable,
    CanActivate,
    ExecutionContext,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuardWithoutBlacklisting extends AuthGuard('jwt')
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

        return true;
    }
}

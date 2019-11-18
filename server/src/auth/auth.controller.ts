import { AuthUserDTO } from './../models/users/auth-user.dto';
import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('session')
export class AuthController {
    constructor(private readonly authservice: AuthService) {}

    @Post()
    @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
    public async logIn(@Body() body: AuthUserDTO ) {
        return await this.authservice.login(body);
    }

}
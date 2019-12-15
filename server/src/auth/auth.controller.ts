import { AuthUserDTO } from './../models/users/auth-user.dto';
import { Controller, Post, UsePipes, ValidationPipe, Body, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuardWithBlacklisting } from '../common/guards/auth-blacklist.guard';
import { token } from '../common/decorators/token.decorator';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('session')
@ApiUseTags('authentication')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
    public async logIn(@Body() body: AuthUserDTO ) {
        return await this.authService.login(body);
    }

    @Delete()
    @UseGuards(AuthGuardWithBlacklisting)
    public async logoutUser(@token() theToken: string) {
    this.authService.blacklistToken(theToken);
    return { msg: 'Successful logout!' };
  }

}

import { CreateUserDTO } from './../models/users/create-user.dto';
import { Controller, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { UsersDataService } from './users-data.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiUseTags('Users Controller')

export class UsersController {

    constructor(private readonly usersService: UsersDataService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({whitelist: true, transform: true}))

    public async addNewUser(@Body() newUser: CreateUserDTO) {

        return await this.usersService.createUser(newUser);
    }

}

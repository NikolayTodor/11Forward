import { TransformInterceptor } from './../transformer/interceptors/transform.interceptor';
import { UserFollowInfoDTO } from './../models/users/user-follow-info.dto';
import { ShowUserDTO } from './../models/users/show-user.dto';
import { FollowActionType } from './../common/enums/follow-action-type';
import { userDecorator } from './../common/decorators/user.decorator';
import { CreateUserDTO } from './../models/users/create-user.dto';
import { Controller, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe, Body, Patch, UseGuards, Param, ParseIntPipe, Get, UseInterceptors, Query } from '@nestjs/common';
import { UsersDataService } from './users-data.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuardWithBlacklisting } from '../common/guards/auth-blacklist.guard';
import { ShowUserProfileDTO } from '../models/users/show-user-profile.dto';

@Controller('users')
@ApiUseTags('Users Controller')
export class UsersController {
    constructor(private readonly usersService: UsersDataService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getAllUsers(@Query('name') name: string): Promise<ShowUserProfileDTO[]> {
        const users: ShowUserProfileDTO[] = await this.usersService.getAllUsers();
        if (name) {
          return users.filter(user =>
            user.username.toLowerCase().includes(name.toLowerCase()),
          );
        }

        users.sort((a, b) => (a.followersCount < b.followersCount) ? 1 :
            (a.followersCount === b.followersCount) ? ((a.username > b.username) ? 1 : -1) : -1 );

        return users;
    }

    // ----- test method for showing user followers and following ------

    @Get(':name')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new TransformInterceptor(UserFollowInfoDTO))
    public async showUserFollowInfo(@Param('name') userName: string ) {
        return await this.usersService.showFollow(userName);
    }
    //

    @Post()
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({whitelist: true, transform: true}))

    public async addNewUser(@Body() newUser: CreateUserDTO) {

        return await this.usersService.createUser(newUser);
    }

    @Patch('/follow/:name')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
    public async followUnfollow(
        @userDecorator('user') user: ShowUserDTO,
        @Body() body: { action: FollowActionType },
        @Param('name') followUserName: string) {

            if ( body.action === FollowActionType.Follow ) {
                return await this.usersService.followUser(user.username, followUserName);
            } else {
                return await this.usersService.unfollowUser(user.username, followUserName);
                     }
            }
}

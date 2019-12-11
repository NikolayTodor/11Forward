import { UserProfileDTO } from './../models/users/user-profile.dto';
import { TransformInterceptor } from './../transformer/interceptors/transform.interceptor';
import { ShowUserDTO } from './../models/users/show-user.dto';
import { FollowActionType } from './../common/enums/follow-action-type';
import { userDecorator } from './../common/decorators/user.decorator';
import { CreateUserDTO } from './../models/users/create-user.dto';
import { Controller, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe, Body, Patch, UseGuards, Param, ParseIntPipe, Get, UseInterceptors, Query, Put } from '@nestjs/common';
import { UsersDataService } from './users-data.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuardWithBlacklisting } from '../common/guards/auth-blacklist.guard';
import { ShowUserProfileDTO } from '../models/users/show-user-profile.dto';
import { UpdateUserDTO } from '../models/users/update-user.dto';

@Controller('users')
@ApiUseTags('Users Controller')
export class UsersController {
    constructor(private readonly usersService: UsersDataService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getAllUsers(
        @Query('name') name: string,
        @Query('take') take: string,
        @Query('skip') skip: string,
        ): Promise<ShowUserProfileDTO[]> {
        const users: ShowUserProfileDTO[] = await this.usersService.getAllUsers(+take, +skip);
        if (name) {
          return users.filter(user =>
            user.username.toLowerCase().includes(name.toLowerCase()),
          );
        }

        return users;
    }

    @Get(':id')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.OK)
    // @UseInterceptors(new TransformInterceptor(UserFollowInfoDTO))
    public async showsingleUser(
        @userDecorator('user') loggedUser: ShowUserDTO,
        @Param('id') userId: string
        ) {
        return await this.usersService.getOneUser(loggedUser.id, userId);
    }

    @Get('/followers/:id')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.OK)
    // @UseInterceptors(new TransformInterceptor(UserFollowInfoDTO))
    public async getFollowers(
        @Param('id') userId: string,
        @Query('take') take: string,
        @Query('skip') skip: string
        ) {
        return await this.usersService.getFollowers(userId, +take, +skip);
    }

    @Get('/following/:id')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.OK)
    // @UseInterceptors(new TransformInterceptor(UserFollowInfoDTO))
    public async getFollowing(
        @Param('id') userId: string,
        @Query('take') take: string,
        @Query('skip') skip: string
        ) {
        return await this.usersService.getFollowing(userId, +take, +skip);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
    public async addNewUser(@Body() newUser: CreateUserDTO) {
        return await this.usersService.createUser(newUser);
    }

    @Put(':id')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.OK)
    // @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
    // @UseInterceptors(new TransformInterceptor(UserProfileDTO))
    public async updateUser(
    @Body() updateInfo: UpdateUserDTO,
    @Param('id') userToUpdateId: string,
    @userDecorator('user') loggedUser: ShowUserDTO) {
        return await this.usersService.updateUser(updateInfo, userToUpdateId, loggedUser.id);
       

    }

    @Patch('/follow/:name')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.OK)
    
    // @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
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

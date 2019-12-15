import { FollowUserDTO } from './../models/users/follow-user.dto';
import { ShowUserProfileDTO } from './../models/users/show-user-profile.dto';
import { TransformInterceptor } from './../transformer/interceptors/transform.interceptor';
import { ShowUserDTO } from './../models/users/show-user.dto';
import { FollowActionType } from './../common/enums/follow-action-type';
import { userDecorator } from './../common/decorators/user.decorator';
import { CreateUserDTO } from './../models/users/create-user.dto';
import { Controller, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe, Body, Patch, UseGuards, Param, ParseIntPipe, Get, UseInterceptors, Query, Put, Delete } from '@nestjs/common';
import { UsersDataService } from './users-data.service';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthGuardWithBlacklisting } from '../common/guards/auth-blacklist.guard';
import { UpdateUserDTO } from '../models/users/update-user.dto';
import { UserFollowInfoDTO } from '../models/users/user-follow-info.dto';


@Controller('users')
@ApiUseTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersDataService) {}

    @Get()
    @UseGuards(AuthGuardWithBlacklisting)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new TransformInterceptor(ShowUserProfileDTO))
    public async getAllUsers(
        @Query('take') take: string,
        @Query('skip') skip: string,
        ) {
        return await this.usersService.getAllUsers(+take, +skip);
    }

    @Get(':id')
    @UseGuards(AuthGuardWithBlacklisting)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new TransformInterceptor(ShowUserProfileDTO))
    public async showsingleUser(
        @userDecorator('user') loggedUser: ShowUserDTO,
        @Param('id') userId: string
        ) {
        return await this.usersService.getOneUser(loggedUser.id, userId);
    }

    @Get('/followers/:id')
    @UseGuards(AuthGuardWithBlacklisting)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new TransformInterceptor(UserFollowInfoDTO))
    public async getFollowers(
        @Param('id') userId: string,
        @Query('take') take: string,
        @Query('skip') skip: string
        ) {
        return await this.usersService.getFollowers(userId, +take, +skip);
    }

    @Get('/following/:id')
    @UseGuards(AuthGuardWithBlacklisting)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new TransformInterceptor(UserFollowInfoDTO))
    public async getFollowing(
        @Param('id') userId: string,
        @Query('take') take: string,
        @Query('skip') skip: string
        ) {
        return await this.usersService.getFollowing(userId, +take, +skip);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(new TransformInterceptor(ShowUserProfileDTO))
    @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
    public async addNewUser(@Body() newUser: CreateUserDTO) {
        return await this.usersService.createUser(newUser);
    }

    @Put(':id')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    // @UsePipes(new ValidationPipe({whitelist: true, transform: true})) ** Comment: the pipe rejects DTO
    @UseInterceptors(new TransformInterceptor(ShowUserProfileDTO))
    public async updateUser(
    @Body() updateInfo: UpdateUserDTO,
    @Param('id') userToUpdateId: string,
    @userDecorator('user') loggedUser: ShowUserDTO) {
        return await this.usersService.updateUser(updateInfo, userToUpdateId, loggedUser.id);
    }

    @Patch('/follow/:name')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @UseInterceptors(new TransformInterceptor(ShowUserProfileDTO))
    // @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
    public async followUnfollow(
        @userDecorator('user') user: ShowUserDTO,
        @Body() body: FollowUserDTO,
        @Param('name') followUserName: string) {
            if ( body.action === FollowActionType.Follow ) {
                return await this.usersService.followUser(user.username, followUserName);
            } else {
                return await this.usersService.unfollowUser(user.username, followUserName);
            }
    }

    @Delete(':id')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOperation({title: 'Delete account', description: 'User can delete his profile account'})
    public async deleteUser(
        @userDecorator('user') loggedUser: ShowUserDTO,
        @Param('id') userId: string
        ) {
        return await this.usersService.deleteUser(loggedUser.id, userId);
    }
}

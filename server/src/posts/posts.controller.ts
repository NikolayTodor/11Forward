import { Controller, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe,
    Body, UseGuards, Get, Param, Put, Delete, Query, UseInterceptors } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDTO } from '../models/posts/create-post.dto';
import { ShowUserDTO } from '../models/users/show-user.dto';
import { userDecorator } from '../common/decorators/user.decorator';
import { AuthGuardWithBlacklisting } from '../common/guards/auth-blacklist.guard';
import { ShowPostDTO } from '../models/posts/show-post.dto';
import { UpdatePostDTO } from '../models/posts/update-post.dto';
import { TransformInterceptor } from '../transformer/interceptors/transform.interceptor';

@Controller('posts')
@ApiUseTags('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({title: 'Get all public posts'})
    @UseInterceptors(new TransformInterceptor(ShowPostDTO))
    public async getPublicPosts(
        @Query('take') take: string,
        @Query('skip') skip: string,
        ) {
        return await this.postsService.allPublicPosts(+take, +skip);
    }

    @Get('/private')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({title: 'Get all private posts'})
    @UseInterceptors(new TransformInterceptor(ShowPostDTO))
    public async getHomePagePostsPrivate(
        @userDecorator() user: ShowUserDTO,
        @Query('take') take: string,
        @Query('skip') skip: string,
    ) {
        return await this.postsService.allAllowedPosts(user.id, +take, +skip);
    }

    @Get('profile/:userId')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOperation({title: 'Get posts of a user'})
    @UseInterceptors(new TransformInterceptor(ShowPostDTO))
    public async getUserPosts(
        @Param('userId') userId: string,
        @userDecorator() user: ShowUserDTO,
        @Query('take') take: string,
        @Query('skip') skip: string,
        ) {
        return await this.postsService.getProfilePosts(user.id, userId, +take, +skip);
    }

    @Get(':postId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({title: 'Get single post by id'})
    @UseInterceptors(new TransformInterceptor(ShowPostDTO))
    public async getOnePost(
        @Param('postId') postId: string,
        ): Promise<ShowPostDTO> {
        return await this.postsService.onePost(postId);
    }

    @Post()
    @UseGuards(AuthGuardWithBlacklisting)
    @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth()
    @ApiOperation({title: 'Create post'})
    @UseInterceptors(new TransformInterceptor(ShowPostDTO))
    public async addNewPost(
        @userDecorator() user: ShowUserDTO,
        @Body() newPost: CreatePostDTO) {
        return await this.postsService.createPost(user.id, newPost);
    }

    @Post('/likes/:postId')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth()
    @ApiOperation({title: 'Like/unlike post', description: 'Increment/decrement the post likes '})
    @UseInterceptors(new TransformInterceptor(ShowPostDTO))
    public async likePost(
      @Param('postId') postId: string,
      @userDecorator() user: ShowUserDTO,
      ) {
      return await this.postsService.likePost(postId, user.id);
    }

    @Put(':postId')
    @UseGuards(AuthGuardWithBlacklisting)
    @ApiBearerAuth()
    @ApiOperation({title: 'Update post', description: 'User can update post title,content,privacy'})
    @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new TransformInterceptor(ShowPostDTO))
    public async updatePost(
      @Param('postId') postId: string,
      @Body() body: UpdatePostDTO,
      @userDecorator() user: ShowUserDTO,
      ) {
        return await this.postsService.updatePost(user.id, postId, body);
    }

    @Delete(':postId')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOperation({title: 'Delete post', description: 'User can delete their post'})
    @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
    public async deletePost(
      @Param('postId') postId: string,
      @userDecorator() user: ShowUserDTO
      ) {
        return await this.postsService.deletePost(user.id, postId);
    }

}

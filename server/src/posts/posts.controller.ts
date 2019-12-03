import { Controller, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe,
    Body, UseGuards, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDTO } from '../models/posts/create-post.dto';
import { ShowUserDTO } from '../models/users/show-user.dto';
import { userDecorator } from '../common/decorators/user.decorator';
import { AuthGuardWithBlacklisting } from '../common/guards/auth-blacklist.guard';
import { ShowPostDTO } from '../models/posts/show-post.dto';
import { UpdatePostDTO } from '../models/posts/update-post.dto';

@Controller('posts')
@ApiUseTags('Posts Controller')
export class PostsController {

    constructor(private readonly postsService: PostsService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getPublicPosts(@Query('username') username: string): Promise<ShowPostDTO[]> {
        const posts: ShowPostDTO[] = await this.postsService.allPublicPosts();

        if (username) {
            return posts.filter(post =>
              post.author.toLowerCase() === username.toLowerCase()
            );
        }

        return posts;
    }

    @Get('/private')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.OK)
    public async getHomePagePostsPrivate(
        @userDecorator() user: ShowUserDTO,
        @Query('username') username: string
    ): Promise<ShowPostDTO[]> {
        const posts: ShowPostDTO[] = await this.postsService.allAllowedPosts(user.id);

        if (username) {
            return posts.filter(post =>
              post.author.toLowerCase() === username.toLowerCase()
            );
        }
        return posts;
    }

    @Get(':postId')
    @HttpCode(HttpStatus.OK)
    public async getOnePost(
        @Param('postId') postId: string,
        ): Promise<ShowPostDTO> {
        return await this.postsService.onePost(postId);
    }

    @Get('profile/:userId')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.OK)
    public async getUserPosts(
        @Param('userId') userId: string,
        @userDecorator() user: ShowUserDTO
    ): Promise<ShowPostDTO[]> {
        return await this.postsService.getProfilePosts(user.id, userId);
}

    @Post()
    @UseGuards(AuthGuardWithBlacklisting)
    @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
    @HttpCode(HttpStatus.CREATED)
    public async addNewPost(
        @userDecorator() user: ShowUserDTO,
        @Body() newPost: CreatePostDTO) {
        return await this.postsService.createPost(user.id, newPost);
    }

    @Post('/likes/:postId')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.CREATED)
    public async likePost(
      @Param('postId') postId: string,
      @userDecorator() user: ShowUserDTO,
      ) {
      return await this.postsService.likePost(postId, user.id);
    }

    @Put(':postId')
    @UseGuards(AuthGuardWithBlacklisting)
    @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
    @HttpCode(HttpStatus.OK)
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
    public async deletePost(
      @Param('postId') postId: string,
      @userDecorator() user: ShowUserDTO
      ) {
        return await this.postsService.deletePost(user.id, postId);
    }

}

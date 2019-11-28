import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { Controller, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe,
    Body, UseGuards, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDTO } from '../models/posts/create-post.dto';
import { ShowUserDTO } from '../models/users/show-user.dto';
import { userDecorator } from '../common/decorators/user.decorator';
import { AuthGuardWithBlacklisting } from '../common/guards/auth-blacklist.guard';
import { ShowPostDTO } from '../models/posts/show-post.dto';
import { UpdatePostDTO } from '../models/posts/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
@ApiUseTags('Posts Controller')
export class PostsController {

    constructor(private readonly postsService: PostsService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getPublicPosts(): Promise<ShowPostDTO[]> {
        const posts: ShowPostDTO[] = await this.postsService.allPublicPosts();

        posts.sort((a, b) => (a.dateCreated < b.dateCreated) ? 1 : -1 );

        return posts;
    }

    @Get('/private')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.OK)
    public async getHomePagePostsPrivate(
        @userDecorator() user: ShowUserDTO
    ): Promise<ShowPostDTO[]> {
        const posts: ShowPostDTO[] = await this.postsService.allAllowedPosts(user.id);

        posts.sort((a, b) => (a.dateCreated < b.dateCreated) ? 1 : -1 );

        return posts;
    }

    @Get(':postId')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.OK)
    public async getOnePost(
        @Param('postId') postId: string,
        @userDecorator() user: ShowUserDTO
        ): Promise<ShowPostDTO> {
        return await this.postsService.onePost(postId, user.id);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('image'))
    @HttpCode(HttpStatus.CREATED)
    // @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
    public async addNewPost(
        @userDecorator() user: ShowUserDTO,
        @UploadedFile() image: any,
        @Body() newPost: CreatePostDTO) {
        
       
        return await this.postsService.createPost(user.id, newPost, image);
    }

    @Put(':postId')
    @UseGuards(AuthGuardWithBlacklisting)
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
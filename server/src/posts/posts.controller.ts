import { Controller, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDTO } from '../models/posts/create-post.dto';
import { ShowUserDTO } from '../models/users/show-user.dto';
import { userDecorator } from '../common/decorators/user.decorator';
import { AuthGuardWithoutBlacklisting } from '../common/guards/auth.guard';

@Controller('posts')
@ApiUseTags('Posts Controller')
export class PostsController {

    constructor(private readonly postsService: PostsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuardWithoutBlacklisting)
    // @UsePipes(new ValidationPipe({whitelist: true, transform: true}))

    public async addNewPost(
        @userDecorator() user: any,
        @Body() newPost: CreatePostDTO) {
        return await this.postsService.createPost(user.id, newPost);
    }

}

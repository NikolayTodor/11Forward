import { Controller, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe, Body, Param, Req } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDTO } from '../models/posts/create-post.dto';
import { ShowUserDTO } from '../models/users/show-user.dto';
import { userDecorator } from '../common/decorators/user.decorator';

@Controller('posts')
@ApiUseTags('Posts Controller')
export class PostsController {

    constructor(private readonly postsService: PostsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    // @UsePipes(new ValidationPipe({whitelist: true, transform: true}))

    public async addNewPost(
        @Req() request: any,
        @Body() newPost: CreatePostDTO) {
            console.log(request.user);
        return await this.postsService.createPost(request.user.id, newPost);
    }

}

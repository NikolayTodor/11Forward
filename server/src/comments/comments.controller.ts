import { Controller, Get, HttpCode, HttpStatus, Query, Param, Post, UseGuards, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ShowCommentDTO } from '../models/comments/show-comment.dto';
import { AuthGuardWithBlacklisting } from '../common/guards/auth-blacklist.guard';
import { userDecorator } from '../common/decorators/user.decorator';
import { ShowUserDTO } from '../models/users/show-user.dto';
import { CreateCommentDTO } from '../models/comments/create-comment.dto';

@Controller('comments')
export class CommentsController {

    constructor(private readonly postsService: CommentsService) {}

    @Get('/:postId')
    @HttpCode(HttpStatus.OK)
    public async getCommentsOfPost(@Param('postId') postId: string): Promise<ShowCommentDTO[]> {
        const posts: ShowCommentDTO[] = await this.postsService.allCommentsOfPost(postId);

        posts.sort((a, b) => (a.dateCreated < b.dateCreated) ? 1 : -1 );

        return posts;
    }

    @Post('/:postId')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.CREATED)
    // @UsePipes(new ValidationPipe({whitelist: true, transform: true}))

    public async addNewPost(
        @userDecorator() user: ShowUserDTO,
        @Param('postId') postId: string,
        @Body() newComment: CreateCommentDTO) {
        return await this.postsService.createComment(user.id, postId, newComment);
    }
}

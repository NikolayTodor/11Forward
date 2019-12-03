import { Controller, Get, HttpCode, HttpStatus, Query, Param, Post, UseGuards, Body, Put, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ShowCommentDTO } from '../models/comments/show-comment.dto';
import { AuthGuardWithBlacklisting } from '../common/guards/auth-blacklist.guard';
import { userDecorator } from '../common/decorators/user.decorator';
import { ShowUserDTO } from '../models/users/show-user.dto';
import { CreateCommentDTO } from '../models/comments/create-comment.dto';
import { UpdateCommentDTO } from '../models/comments/update-comment.dto';

@Controller('comments')
export class CommentsController {

    constructor(private readonly commentsService: CommentsService) {}

    @Get(':postId')
    @HttpCode(HttpStatus.OK)
    public async getCommentsOfPost(@Param('postId') postId: string): Promise<ShowCommentDTO[]> {
        return await this.commentsService.allCommentsOfPost(postId);
    }

    @Post(':postId')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.CREATED)
    // @UsePipes(new ValidationPipe({whitelist: true, transform: true}))

    public async addNewComment(
        @userDecorator() user: ShowUserDTO,
        @Param('postId') postId: string,
        @Body() newComment: CreateCommentDTO) {
        return await this.commentsService.createComment(user.id, postId, newComment);
    }

    @Post('/likes/:commentId')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.CREATED)
    public async likeComment(
      @Param('commentId') commentId: string,
      @userDecorator() user: ShowUserDTO,
    ) {
      return await this.commentsService.likeComment(commentId, user.id);
    }

    @Put(':commentId')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.OK)
    // @UsePipes(new ValidationPipe({whitelist: true, transform: true}))

    public async UpdateComment(
        @userDecorator() user: ShowUserDTO,
        @Param('commentId') commentId: string,
        @Body() updatedComment: UpdateCommentDTO) {
        return await this.commentsService.updateComment(user.id, commentId, updatedComment);
    }

    @Delete(':commentId')
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.OK)
    public async deleteComment(
      @Param('commentId') commentId: string,
      @userDecorator() user: ShowUserDTO
    ) {
        return await this.commentsService.deleteComment(user.id, commentId);
    }
}

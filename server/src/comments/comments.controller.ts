import { Controller, Get, HttpCode, HttpStatus, Param, Post,
    UseGuards, Body, Put, Delete, ValidationPipe, UsePipes, Query, UseInterceptors } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ShowCommentDTO } from '../models/comments/show-comment.dto';
import { AuthGuardWithBlacklisting } from '../common/guards/auth-blacklist.guard';
import { userDecorator } from '../common/decorators/user.decorator';
import { ShowUserDTO } from '../models/users/show-user.dto';
import { CreateCommentDTO } from '../models/comments/create-comment.dto';
import { UpdateCommentDTO } from '../models/comments/update-comment.dto';
import { TransformInterceptor } from '../transformer/interceptors/transform.interceptor';
import { ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('comments')
@ApiUseTags('comments')
export class CommentsController {

    constructor(private readonly commentsService: CommentsService) {}

    @Get(':postId')
    @UseInterceptors(new TransformInterceptor(ShowCommentDTO))
    @ApiOperation({title: 'Get comments', description: 'Returns all the comments of a single post'})
    @HttpCode(HttpStatus.OK)
    public async getCommentsOfPost(
      @Param('postId') postId: string,
      @Query('take') take: string,
      @Query('skip') skip: string,
      ): Promise<ShowCommentDTO[]> {
        return await this.commentsService.allCommentsOfPost(postId, +take, +skip);
    }

    @Post(':postId')
    @UseInterceptors(new TransformInterceptor(ShowCommentDTO))
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth()
    @ApiOperation({title: 'Create comment', description: 'Create comment for a post'})
    @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
    public async addNewComment(
        @userDecorator() user: ShowUserDTO,
        @Param('postId') postId: string,
        @Body() newComment: CreateCommentDTO) {
        return await this.commentsService.createComment(user.id, postId, newComment);
    }

    @Post('/likes/:commentId')
    @UseGuards(AuthGuardWithBlacklisting)
    @UseInterceptors(new TransformInterceptor(ShowCommentDTO))
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth()
    @ApiOperation({title: 'Like comment', description: 'User can like the comments'})
    public async likeComment(
      @Param('commentId') commentId: string,
      @userDecorator() user: ShowUserDTO,
    ) {
      return await this.commentsService.likeComment(commentId, user.id);
    }

    @Put(':commentId')
    @UseInterceptors(new TransformInterceptor(ShowCommentDTO))
    @UseGuards(AuthGuardWithBlacklisting)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOperation({title: 'Update comment', description: 'User can update his comment'})
    @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
    public async UpdateComment(
        @userDecorator() user: ShowUserDTO,
        @Param('commentId') commentId: string,
        @Body() updatedComment: UpdateCommentDTO) {
        return await this.commentsService.updateComment(user.id, commentId, updatedComment);
    }

    @Delete(':commentId')
    @UseGuards(AuthGuardWithBlacklisting)
    @ApiBearerAuth()
    @ApiOperation({title: 'Delete comment', description: 'User can delete his comment'})
    @HttpCode(HttpStatus.OK)
    public async deleteComment(
      @Param('commentId') commentId: string,
      @userDecorator() user: ShowUserDTO
    ) {
        return await this.commentsService.deleteComment(user.id, commentId);
    }
}

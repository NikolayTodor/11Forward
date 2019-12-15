import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { Comment } from '../data/entities/comment.entity';
import { Post } from '../data/entities/post.entity';
import { User } from '../data/entities/user.entity';
import { CreateCommentDTO } from '../models/comments/create-comment.dto';
import { ShowCommentDTO } from '../models/comments/show-comment.dto';
import { UpdateCommentDTO } from '../models/comments/update-comment.dto';
import { LikeComment } from '../data/entities/like-comment.entity';
import { ApiSystemError } from '../common/exceptions/api-system.error';

@Injectable()
export class CommentsService {

    public constructor(
        @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
        @InjectRepository(LikeComment) private readonly likeCommentRepo: Repository<LikeComment>,
        @InjectRepository(Post) private readonly postRepo: Repository<Post>,
        @InjectRepository(User) private readonly userRepo: Repository<User>
        ) {}

    public async allCommentsOfPost(postId: string, take: number, skip: number): Promise<ShowCommentDTO[]> {
        const allComments: Comment[] = await this.commentRepo.find({
            where: {
                post: postId,
                isDeleted: false
            },
            order: { dateCreated: 'DESC' },
            take,
            skip: skip * take
        });

        const returnComments = allComments.map((comment) => this.dateTransform(comment));

        return returnComments;
    }

    public async createComment(userId: string, postId: string, commentToCreate: CreateCommentDTO): Promise<ShowCommentDTO> {
        const foundUser = await this.userRepo.findOne({
            where: {
                id: userId
            }
        });
        if (foundUser === undefined || foundUser.isDeleted) {
            throw new NotFoundException('No such user found');
        }

        const foundPost = await this.postRepo.findOne({
            where: {
                id: postId
            }
        });
        if (foundPost === undefined || foundPost.isDeleted) {
            throw new NotFoundException('This post is not available in the database!');
        }

        const newComment: Comment = this.commentRepo.create(commentToCreate);
        newComment.author = foundUser;
        newComment.post = Promise.resolve(foundPost);
        await this.commentRepo.save(newComment);

        const returnComment = this.dateTransform(newComment);

        return returnComment;
    }

    public async likeComment(commentId: string, userId: string) {
        const foundComment = await this.commentRepo.findOne({where: {id: commentId}});
        const foundUser = await this.userRepo.findOne({where: {id: userId}});

        if (foundComment === undefined || foundComment.isDeleted) {
          throw new NotFoundException('No such review found');
        }
        if (foundUser === undefined || foundUser.isDeleted) {
          throw new NotFoundException('No such user found');
        }

        const foundLike: LikeComment = await this.likeCommentRepo.findOne({ where: { user: userId, comment: commentId }});
        if (foundLike) {
          await this.likeCommentRepo.delete(foundLike);
          foundComment.likesCount -= 1;
          // tslint:disable-next-line: no-shadowed-variable
          const returnComment = this.dateTransform(foundComment);
          return returnComment;
        }

        const newLike: LikeComment = this.likeCommentRepo.create({});
        newLike.comment = Promise.resolve(foundComment);
        newLike.user = Promise.resolve(foundUser);
        await this.likeCommentRepo.save(newLike);

        foundComment.likesCount += 1;
        const returnComment = this.dateTransform(foundComment);

        return returnComment;
      }

    public async updateComment(userId: string, commentId: string, body: UpdateCommentDTO) {
        const foundComment = await this.commentRepo.findOne({where: {id: commentId}});

        if (foundComment.author.id !== userId) {
            throw new ApiSystemError(`You are not the author of this post!`, 404);
        }

        foundComment.content = body.content;

        await this.commentRepo.save(foundComment);
        const returnComment = this.dateTransform(foundComment);

        return returnComment;
    }

    public async deleteComment(userId: string, commentId: string) {
        const foundComment = await this.commentRepo.findOne({where: {id: commentId}});

        if (foundComment.author.id !== userId) {
            throw new ApiSystemError(`You are neither the author of this post, nor an admin!`, 404);
        }

        foundComment.isDeleted = true;
        foundComment.post = null;
        await this.commentRepo.save(foundComment);

        const foundLikes = await this.likeCommentRepo.find({where: {comment: commentId}});

        if (foundLikes.length) {
            await Promise.all(foundLikes.map(async (like) => await this.likeCommentRepo.delete(like)));
        }

        return { msg: `Comment successfully deleted!`};
    }

    private dateTransform(comment: Comment): Comment {
        comment.dateCreated = moment(comment.dateCreated).startOf('minute').fromNow();
        comment.dateLastUpdated = moment(comment.dateLastUpdated).startOf('minute').fromNow();
        return comment;
    }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

        foundPost.commentsCount += 1;
        this.postRepo.save(foundPost);

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
          const returnComment = this.dateTransform(foundComment);
          return returnComment;
        }

        const newLike: LikeComment = this.likeCommentRepo.create({});
        newLike.comment = Promise.resolve(foundComment);
        newLike.user = Promise.resolve(foundUser);
        await this.likeCommentRepo.save(newLike);

        foundComment.likesCount += 1;
        const returnComment = this.dateTransform(foundComment)

        return returnComment;
      }

    public async updateComment(userId: string, commentId: string, body: UpdateCommentDTO) {

        const foundComment = await this.commentRepo.findOne({where: {id: commentId}});

        foundComment.content = body.content;

        await this.commentRepo.save(foundComment);

        return {
            id: foundComment.id,
            content: foundComment.content,
            dateCreated: moment(foundComment.dateCreated).startOf('minute').fromNow(),
            dateLastUpdated: moment(foundComment.dateLastUpdated).startOf('minute').fromNow(),
            author: foundComment.author.username,
            authorAvatar: foundComment.author.avatarURL,
            authorId: foundComment.author.id,
            likes: foundComment.likesCount
        };
    }

    public async deleteComment(userId: string, commentId: string) {

        const foundComment = await this.commentRepo.findOne({where: {id: commentId}});

        if (foundComment.author.id !== userId
            //  && foundUser.role.name !== 'Admin'
        ) {
            throw new BadRequestException(`You are neither the author of this post, nor an admin!`);
        }

        const foundPost = await foundComment.post;
        foundPost.commentsCount -= 1;
        await this.postRepo.save(foundPost);

        const foundLikes = await this.likeCommentRepo.find({where: {comment: commentId}});

        if (foundLikes.length) {
            foundLikes.forEach(async (like) => await this.likeCommentRepo.delete(like));
        }

        foundComment.isDeleted = true;
        await this.commentRepo.save(foundComment);

        return { msg: `Comment successfully deleted!`};
    }

    private dateTransform(comment: Comment): Comment {
        comment.dateCreated = moment(comment.dateCreated).startOf('minute').fromNow();
        comment.dateLastUpdated = moment(comment.dateLastUpdated).startOf('minute').fromNow();
        return comment;
    }
}

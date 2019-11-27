import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ShowCommentDTO } from '../models/comments/show-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../data/entities/comment.entity';
import * as moment from 'moment';
import { CreateCommentDTO } from '../models/comments/create-comment.dto';
import { User } from '../data/entities/user.entity';
import { Post } from '../data/entities/post.entity';
import { UpdateCommentDTO } from '../models/comments/update-comment.dto';

@Injectable()
export class CommentsService {

    public constructor(
        @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
        @InjectRepository(Post) private readonly postRepo: Repository<Post>,
        @InjectRepository(User) private readonly userRepo: Repository<User>
        ) {}

    public async allCommentsOfPost(postId): Promise<ShowCommentDTO[]> {
        const allComments: Comment[] = await this.commentRepo.find({
            where: {
                post: postId,
                isDeleted: false
            }
        });

        return Array.from(allComments.map((comment: Comment) => ({
            id: comment.id,
            content: comment.content,
            dateCreated: moment(comment.dateCreated).format('MMMM Do YYYY, h:mm:ss a'),
            dateLastUpdated: moment(comment.dateLastUpdated).format('MMMM Do YYYY, h:mm:ss a'),
            author: comment.author.username,
            likes: comment.likesCount
        })));
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

        return {
            id: newComment.id,
            content: newComment.content,
            dateCreated: moment(newComment.dateCreated).format('MMMM Do YYYY, h:mm:ss a'),
            dateLastUpdated: moment(newComment.dateLastUpdated).format('MMMM Do YYYY, h:mm:ss a'),
            author: newComment.author.username,
            likes: newComment.likesCount
        };
    }

    public async updateComment(userId: string, commentId: string, body: UpdateCommentDTO) {
        const foundUser = await this.userRepo.findOne({where: {id: userId}});
        const foundComment = await this.commentRepo.findOne({where: {id: commentId}});

        if (foundComment.author.id !== userId
            //  && foundUser.role.name !== 'Admin'
        ) {
            throw new BadRequestException(`You are neither the author of this post, nor an admin!`);
        }

        foundComment.content = body.content;

        await this.commentRepo.save(foundComment);

        return {
            id: foundComment.id,
            content: foundComment.content,
            dateCreated: moment(foundComment.dateCreated).format('MMMM Do YYYY, h:mm:ss a'),
            dateLastUpdated: moment(foundComment.dateLastUpdated).format('MMMM Do YYYY, h:mm:ss a'),
            author: foundComment.author.username,
            likes: foundComment.likesCount
        };
    }
}

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Post } from '../data/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDTO } from '../models/posts/create-post.dto';
import { User } from '../data/entities/user.entity';
import { ShowPostDTO } from '../models/posts/show-post.dto';
import { Comment } from '../data/entities/comment.entity';
import { UpdatePostDTO } from '../models/posts/update-post.dto';
import * as moment from 'moment';

@Injectable()
export class PostsService {

    public constructor(
        @InjectRepository(Post) private readonly postRepo: Repository<Post>,
        @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
        @InjectRepository(User) private readonly userRepo: Repository<User>) {}

    public async allPublicPosts(): Promise<ShowPostDTO[]> {
        const allPosts: Post[] = await this.postRepo.find({
            where: {
                isDeleted: false,
                isPrivate: false,
                hasPermission: true
            }
        });

        return Array.from(allPosts.map((post: Post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            imageURL: post.imageURL,
            isPrivate: post.isPrivate,
            dateCreated: moment(post.dateCreated).format('MMMM Do YYYY, h:mm:ss a'),
            dateLastUpdated: moment(post.dateLastUpdated).format('MMMM Do YYYY, h:mm:ss a'),
            author: post.author.username,
            commentsCount: post.commentsCount,
            likes: post.likesCount
        })));
    }

    public async allAllowedPosts(userId): Promise<ShowPostDTO[]> {
        const allPosts: Post[] = await this.postRepo.find({
            where: {
                isDeleted: false
            }
        });

        const foundUser: User = await this.userRepo.findOne({where: {id: userId},
            relations: ['following']});

        const foundUserFollows = [...await foundUser.following];

        allPosts.forEach(post => {
            if (post.isPrivate === true) {
                const author = post.author;
                if (author.id === userId) {
                    post.hasPermission = true;
                } else {
                    if (foundUserFollows.find(following => following.id === author.id)) {
                        post.hasPermission = true;
                    }
                }
            }
        });

        const filteredPosts = allPosts.filter(post => post.hasPermission === true);

        return Array.from(filteredPosts.map((post: Post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            imageURL: post.imageURL,
            isPrivate: post.isPrivate,
            dateCreated: moment(post.dateCreated).format('MMMM Do YYYY, h:mm:ss a'),
            dateLastUpdated: moment(post.dateLastUpdated).format('MMMM Do YYYY, h:mm:ss a'),
            author: post.author.username,
            commentsCount: post.commentsCount,
            likes: post.likesCount
        })));
    }

    public async onePost(postId: string, userId: string): Promise<ShowPostDTO> {
        const foundPost: Post = await this.postRepo.findOne({
            where: {
                id: postId
            }
        });

        // Proverka dali avtora e follownat ot 4etq6tiq i posta dali e public
        // Ako da - hasPermission = true
        // Ako ne - hasPermission = false

        return {
            id: foundPost.id,
            title: foundPost.title,
            content: foundPost.content,
            imageURL: foundPost.imageURL,
            isPrivate: foundPost.isPrivate,
            dateCreated: moment(foundPost.dateCreated).format('MMMM Do YYYY, h:mm:ss a'),
            dateLastUpdated: moment(foundPost.dateLastUpdated).format('MMMM Do YYYY, h:mm:ss a'),
            author: foundPost.author.username,
            commentsCount: foundPost.commentsCount,
            likes: foundPost.likesCount
        };
    }

    public async createPost(userId: string, postToCreate: CreatePostDTO): Promise<ShowPostDTO> {
        const foundUser = await this.userRepo.findOne({
            where: {
                id: userId
            }
        });
        if (foundUser === undefined || foundUser.isDeleted) {
            throw new NotFoundException('No such user found');
        }

        const newPost: Post = this.postRepo.create(postToCreate);
        newPost.author = foundUser;
        if (postToCreate.isPrivate === true) {
            newPost.hasPermission = false;
        }
        await this.postRepo.save(newPost);

        return {
            id: newPost.id,
            title: newPost.title,
            content: newPost.content,
            imageURL: newPost.imageURL,
            isPrivate: newPost.isPrivate,
            dateCreated: moment(newPost.dateCreated).format('MMMM Do YYYY, h:mm:ss a'),
            dateLastUpdated: moment(newPost.dateLastUpdated).format('MMMM Do YYYY, h:mm:ss a'),
            author: newPost.author.username,
            commentsCount: newPost.commentsCount,
            likes: newPost.likesCount
        };
    }

    public async updatePost(userId: string, postId: string, body: UpdatePostDTO) {
        const foundUser = await this.userRepo.findOne({where: {id: userId}});
        const foundPost = await this.postRepo.findOne({where: {id: postId}});

        if (foundPost.author.id !== userId
            //  && foundUser.role.name !== 'Admin'
        ) {
            throw new BadRequestException(`You are neither the author of this post, nor an admin!`);
        }

        const {
            title,
            content,
            isPrivate
        } = body;
        const propsToUpdate = {
            title,
            content,
            isPrivate
        };
        Object.keys(propsToUpdate).forEach((prop: string) => {
            if ((propsToUpdate as any)[prop] !== undefined) {
                (foundPost as any)[prop] = (propsToUpdate as any)[prop];
            }
        });

        await this.postRepo.save(foundPost);

        return {
            msg: `The post has been successfully updated!`
        };
    }

    public async deletePost(userId: string, postId: string) {
        const foundUser = await this.userRepo.findOne({where: {id: userId}});
        const foundPost = await this.postRepo.findOne({where: {id: postId}});

        if (foundPost.author.id !== userId
            //  && foundUser.role.name !== 'Admin'
        ) {
            throw new BadRequestException(`You are neither the author of this post, nor an admin!`);
        }

        foundPost.isDeleted = true;
        await this.postRepo.save(foundPost);

        return { msg: `Post successfully deleted!`};
    }
}

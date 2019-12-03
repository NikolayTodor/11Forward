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
import { LikePost } from '../data/entities/like-post.entity';

@Injectable()
export class PostsService {

    public constructor(
        @InjectRepository(Post) private readonly postRepo: Repository<Post>,
        @InjectRepository(LikePost) private readonly likePostRepo: Repository<LikePost>,
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

        allPosts.sort((a, b) => (a.dateLastUpdated < b.dateLastUpdated) ? 1 : -1 );

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

        filteredPosts.sort((a, b) => (a.dateLastUpdated < b.dateLastUpdated) ? 1 : -1 );

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

    public async onePost(postId: string): Promise<ShowPostDTO> {
        const foundPost: Post = await this.postRepo.findOne({
            where: {
                id: postId
            }
        });

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

    public async likePost(postId: string, userId: string) {
        const foundPost = await this.postRepo.findOne({where: {id: postId}});
        const foundUser = await this.userRepo.findOne({where: {id: userId}});

        if (foundPost === undefined || foundPost.isDeleted) {
          throw new NotFoundException('No such review found');
        }
        if (foundUser === undefined || foundUser.isDeleted) {
          throw new NotFoundException('No such user found');
        }

        const foundLike: LikePost = await this.likePostRepo.findOne({ where: { user: userId, post: postId }});
        if (foundLike) {
          await this.likePostRepo.delete(foundLike);
          return { msg: `You have unliked this Post. The Post now has ${foundPost.likesCount - 1} likes.`};
        }

        const newLike: LikePost = this.likePostRepo.create({});
        newLike.post = Promise.resolve(foundPost);
        newLike.user = Promise.resolve(foundUser);
        await this.likePostRepo.save(newLike);

        return { msg: `You have liked this Post. The Post now has ${foundPost.likesCount + 1} likes.`};
      }

    public async getProfilePosts(loggedUserId: string, userWithPostsId: string) {

        const foundUser = await this.userRepo.findOne({
            where : {id: userWithPostsId},
            relations: ['posts']
        });
        const userPosts = await foundUser.posts;
        userPosts.sort((a, b) => (a.dateLastUpdated < b.dateLastUpdated) ? 1 : -1 );
        return Array.from(userPosts.map((post: Post) => ({
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

    public async updatePost(userId: string, postId: string, body: UpdatePostDTO) {
        const foundUser = await this.userRepo.findOne({where: {id: userId}});
        const foundPost = await this.postRepo.findOne({where: {id: postId}});

        if (foundPost.author.id !== userId
            //  && foundUser.role.name !== 'Admin'
        ) {
            throw new BadRequestException(`You are neither the author of this post, nor an admin!`);
        }

        Object.keys(body).forEach((prop: string) => {
            if ((body as any)[prop] !== undefined) {
                (foundPost as any)[prop] = (body as any)[prop];
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

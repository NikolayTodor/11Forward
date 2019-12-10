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
import axios from 'axios';
import { ApiSystemError } from '../common/exceptions/api-system.error';

@Injectable()
export class PostsService {

    public constructor(
        @InjectRepository(Post) private readonly postRepo: Repository<Post>,
        @InjectRepository(LikePost) private readonly likePostRepo: Repository<LikePost>,
        @InjectRepository(User) private readonly userRepo: Repository<User>) {}

    public async allPublicPosts(take: number, skip: number): Promise<ShowPostDTO[]> {
        const allPosts: Post[] = await this.postRepo.find({
            where: {
                isDeleted: false,
                isPrivate: false,
                hasPermission: true
            },
            order: { dateLastUpdated: 'DESC' },
            take,
            skip: take * skip
        });

        return Array.from(allPosts.map((post: Post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            imageURL: post.imageURL,
            isPrivate: post.isPrivate,
            dateCreated: moment(post.dateCreated).startOf('minute').fromNow(),
            dateLastUpdated: moment(post.dateLastUpdated).startOf('minute').fromNow(),
            author: post.author.username,
            authorUrl: post.author.avatarURL,
            commentsCount: post.commentsCount,
            likes: post.likesCount
        })));
    }

    public async allAllowedPosts(userId: string, take: number, skip: number): Promise<ShowPostDTO[]> {
        const allPosts: Post[] = await this.postRepo.find({
            where: {
                isDeleted: false
            },
            order: { dateLastUpdated: 'DESC' },
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

        const postsToReturn = filteredPosts.slice(take * skip, take * (skip + 1));

        return Array.from(postsToReturn.map((post: Post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            imageURL: post.imageURL,
            isPrivate: post.isPrivate,
            dateCreated: moment(post.dateCreated).startOf('minute').fromNow(),
            dateLastUpdated: moment(post.dateLastUpdated).startOf('minute').fromNow(),
            author: post.author.username,
            authorUrl: post.author.avatarURL,
            commentsCount: post.commentsCount,
            likes: post.likesCount
        })));
    }

    public async getProfilePosts(loggedUserId: string, userWithPostsId: string, take: number, skip: number) {



        const foundUser = await this.userRepo.findOne({
            where : {id: userWithPostsId},
            relations: ['posts', 'followers']
        });



        // We check if the logged user follows this active profile
        const checkIfOwner = loggedUserId === userWithPostsId;
        const checkIfFollower = await foundUser.followers
            .then(data => data.some(follower => follower.id === loggedUserId));

        let userPosts = await foundUser.posts;

        userPosts = userPosts.filter((post) => post.isDeleted === false);
        userPosts = userPosts.sort((a, b) => (a.dateLastUpdated < b.dateLastUpdated) ? 1 : -1 );

        // If the logged user does not follow the profile then he will receive only the public posts

        if (!checkIfFollower && !checkIfOwner) {
            userPosts = userPosts.filter(post => !post.isPrivate);
        }

        userPosts = userPosts.slice(take * skip, take * (skip + 1));

        return Array.from(userPosts.map((post: Post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            imageURL: post.imageURL,
            isPrivate: post.isPrivate,
            dateCreated: moment(post.dateCreated).startOf('minute').fromNow(),
            dateLastUpdated: moment(post.dateLastUpdated).startOf('minute').fromNow(),
            author: post.author.username,
            authorUrl: post.author.avatarURL,
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

        console.log(foundPost);
        return {
            id: foundPost.id,
            title: foundPost.title,
            content: foundPost.content,
            imageURL: foundPost.imageURL,
            isPrivate: foundPost.isPrivate,
            dateCreated: moment(foundPost.dateCreated).startOf('minute').fromNow(),
            dateLastUpdated: moment(foundPost.dateLastUpdated).startOf('minute').fromNow(),
            author: foundPost.author.username,
            authorUrl: foundPost.author.avatarURL,
            commentsCount: foundPost.commentsCount,
            likes: foundPost.likesCount
        };
    }

    public async createPost(userId: string, postToCreate: CreatePostDTO): Promise<any> {
        const foundUser = await this.userRepo.findOne({
            where: {
                id: userId
            }
        });
        if (foundUser === undefined || foundUser.isDeleted) {
            throw new NotFoundException('No such user found');
        }

        
        const base = postToCreate.base.slice(22);
        const urlFromImgur: string = await this.uploadPhoto(base);
        postToCreate.imageURL = urlFromImgur;

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
            dateCreated: moment(newPost.dateCreated).startOf('minute').fromNow(),
            dateLastUpdated: moment(newPost.dateLastUpdated).startOf('minute').fromNow(),
            author: newPost.author.username,
            authorUrl: newPost.author.avatarURL,
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
          return {
            id: foundPost.id,
            title: foundPost.title,
            content: foundPost.content,
            imageURL: foundPost.imageURL,
            isPrivate: foundPost.isPrivate,
            dateCreated: moment(foundPost.dateCreated).startOf('minute').fromNow(),
            dateLastUpdated: moment(foundPost.dateLastUpdated).startOf('minute').fromNow(),
            author: foundPost.author.username,
            authorUrl: foundPost.author.avatarURL,
            commentsCount: foundPost.commentsCount,
            likes: foundPost.likesCount - 1
        };
        }

        const newLike: LikePost = this.likePostRepo.create({});
        newLike.post = Promise.resolve(foundPost);
        newLike.user = Promise.resolve(foundUser);
        await this.likePostRepo.save(newLike);

        return {
            id: foundPost.id,
            title: foundPost.title,
            content: foundPost.content,
            imageURL: foundPost.imageURL,
            isPrivate: foundPost.isPrivate,
            dateCreated: moment(foundPost.dateCreated).startOf('minute').fromNow(),
            dateLastUpdated: moment(foundPost.dateLastUpdated).startOf('minute').fromNow(),
            author: foundPost.author.username,
            authorUrl: foundPost.author.avatarURL,
            commentsCount: foundPost.commentsCount,
            likes: foundPost.likesCount + 1
        };
      }

    public async updatePost(userId: string, postId: string, body: UpdatePostDTO) {
        const foundUser = await this.userRepo.findOne({where: {id: userId}});
        const foundPost = await this.postRepo.findOne({where: {id: postId}});

        if (foundPost.author.id !== userId
        ) {
            throw new BadRequestException(`You are neither the author of this post, nor an admin!`);
        }

        Object.keys(body).forEach((prop: string) => {
            if ((body as any)[prop] !== undefined && (body as any)[prop] !== '') {
                (foundPost as any)[prop] = (body as any)[prop];
            }
        });
        if (foundPost.isPrivate === true) {
           foundPost.hasPermission = false;
        } else {
            foundPost.hasPermission = true;
        }

        await this.postRepo.save(foundPost);

        return {
            id: foundPost.id,
            title: foundPost.title,
            content: foundPost.content,
            imageURL: foundPost.imageURL,
            isPrivate: foundPost.isPrivate,
            dateCreated: moment(foundPost.dateCreated).startOf('minute').fromNow(),
            dateLastUpdated: moment(foundPost.dateLastUpdated).startOf('minute').fromNow(),
            author: foundPost.author.username,
            authorUrl: foundPost.author.avatarURL,
            commentsCount: foundPost.commentsCount,
            likes: foundPost.likesCount
        };
    }

    public async deletePost(userId: string, postId: string) {
        const foundUser = await this.userRepo.findOne({where: {id: userId}});
        const foundPost = await this.postRepo.findOne({where: {id: postId}});

        if (foundPost.author.id !== userId) {
            throw new BadRequestException(`You are neither the author of this post, nor an admin!`);
        }

        const foundLikes = await this.likePostRepo.find({where: {comment: postId}});

        if (foundLikes.length) {
            foundLikes.forEach(async (like) => await this.likePostRepo.delete(like));
        }

        foundPost.isDeleted = true;
        await this.postRepo.save(foundPost);

        return { msg: `Post successfully deleted!`};
    }

    async uploadPhoto(base: string): Promise<string> {
        

        try {
        const data = await axios(`https://api.imgur.com/3/upload`, {
            method: 'POST',
            headers: {
               Authorization: `Client-ID 7084d3c72f8fab9`,
            },
            data: {image: base},
          });
          return data.data.data.link;
        } catch (error) {
         console.log(error);
        }
    }

}

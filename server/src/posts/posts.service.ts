import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Post } from '../data/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDTO } from '../models/posts/create-post.dto';
import { User } from '../data/entities/user.entity';
import { UpdatePostDTO } from '../models/posts/update-post.dto';
import * as moment from 'moment';
import { LikePost } from '../data/entities/like-post.entity';
import axios from 'axios';
import { Comment } from '../data/entities/comment.entity';

@Injectable()
export class PostsService {

    public constructor(
        @InjectRepository(Post) private readonly postRepo: Repository<Post>,
        @InjectRepository(LikePost) private readonly likePostRepo: Repository<LikePost>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>) {}

    public async allPublicPosts(take: number, skip: number) {
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

        const postsToReturn: Post[] = allPosts.map((post: Post) => this.dateTransform(post));

        return postsToReturn;
    }

    public async allAllowedPosts(userId: string, take: number, skip: number) {
        const allPosts: Post[] = await this.postRepo.find({
            where: {
                isDeleted: false
            },
            order: { dateLastUpdated: 'DESC' },
        });

        const foundUser: User = await this.userRepo.findOne({where: {id: userId},
            relations: ['following']});

        const foundUserFollows = [...await foundUser.following];

        allPosts.forEach(async post => {
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

        const postsToReturn = filteredPosts.slice(take * skip, take * (skip + 1)).map((post:Post) => this.dateTransform(post))

        return postsToReturn;
    }

    public async getProfilePosts(loggedUserId: string, userWithPostsId: string, take: number, skip: number) {

        const foundUser = await this.userRepo.findOne({
            where : {id: userWithPostsId},
            relations: ['posts', 'followers']
        });

        const checkIfOwner = loggedUserId === userWithPostsId;
        const checkIfFollower = await foundUser.followers
            .then(data => data.some(follower => follower.id === loggedUserId));

        let userPosts: Post[] = await foundUser.posts;
        userPosts = userPosts.map(post => this.dateTransform(post));

        userPosts = userPosts.filter((post) => post.isDeleted === false);
        userPosts = userPosts.sort((a, b) => (a.dateLastUpdated < b.dateLastUpdated) ? 1 : -1 );

        if (!checkIfFollower && !checkIfOwner) {
            userPosts = userPosts.filter(post => !post.isPrivate);
        }

        userPosts = userPosts.slice(take * skip, take * (skip + 1));

        return userPosts;
    }

    public async onePost(postId: string) {
        const foundPost: Post = await this.postRepo.findOne({
            where: {
                id: postId
            }
        });

        foundPost.dateCreated = moment(foundPost.dateCreated).startOf('minute').fromNow();
        foundPost.dateLastUpdated = moment(foundPost.dateLastUpdated).startOf('minute').fromNow();

        return foundPost;

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

        newPost.dateCreated = moment(newPost.dateCreated).startOf('minute').fromNow();
        newPost.dateCreated = moment(newPost.dateLastUpdated).startOf('minute').fromNow();

        return newPost;
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
          foundPost.likesCount -= 1;
          const returnPost = this.dateTransform(foundPost);
          return returnPost;
        }

        const newLike: LikePost = this.likePostRepo.create({});
        newLike.post = Promise.resolve(foundPost);
        newLike.user = Promise.resolve(foundUser);
        await this.likePostRepo.save(newLike);
        foundPost.likesCount += 1;
        const returnPost = this.dateTransform(foundPost);
        return returnPost;

      }

    public async updatePost(userId: string, postId: string, body: UpdatePostDTO) {
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
        const returnPost = this.dateTransform(foundPost);
        return returnPost;
    }

    public async deletePost(userId: string, postId: string) {
        const foundPost = await this.postRepo.findOne({where: {id: postId}});

        if (foundPost.author.id !== userId) {
            throw new BadRequestException(`You are neither the author of this post, nor an admin!`);
        }

        const foundLikes = await this.likePostRepo.find({where: {post: postId}});
        if (foundLikes.length) {
            foundLikes.forEach(async (like) => await this.likePostRepo.delete(like));
        }

        const commentsToPost: Comment[] = await this.commentRepo.find({where: {post: postId}});
        if (commentsToPost.length) {
            commentsToPost.forEach(comment => comment.isDeleted = true);
        }
        await this.commentRepo.save(commentsToPost);

        foundPost.isDeleted = true;
        await this.postRepo.save(foundPost);

        return { msg: `Post successfully deleted!`};
    }

    public async uploadPhoto(base: string): Promise<string> {

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

    private dateTransform(post: Post): Post {
        post.dateCreated = moment(post.dateCreated).startOf('minute').fromNow();
        post.dateLastUpdated = moment(post.dateLastUpdated).startOf('minute').fromNow();
        return post;
    }

}

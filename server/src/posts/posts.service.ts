import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '../data/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDTO } from '../models/posts/create-post.dto';
import { User } from '../data/entities/user.entity';
import { ShowPostInListDTO } from '../models/posts/show-post-in-list.dto';
import { Comment } from '../data/entities/comment.entity';

@Injectable()
export class PostsService {

    public constructor(
        @InjectRepository(Post) private readonly postRepo: Repository<Post>,
        @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
        @InjectRepository(User) private readonly userRepo: Repository<User>) {}

        public async allPosts(userId: string): Promise<ShowPostInListDTO[]> {
            const allPosts: Post[] = await this.postRepo.find({where: {isDeleted: false}});

            allPosts.forEach(async post => {
                if (post.isPrivate === true) {
                const author = await post.author;
                // Proverka dali avtora e follownat ot 4etq6tiq
                // Ako da - hasPermission = true
                // Ako ne - hasPermission = false
                }
            });
            const filteredPosts = allPosts.filter(post => post.hasPermission === true);

            filteredPosts.forEach(async post => {
                const comments: Comment[] = await this.commentRepo.find({where: {post: post.id, isDeleted: false}});

            });

              return filteredPosts.map((post: Post) => ({
              id: post.id,
              title: post.title,
              content: post.content,
              imageURL: post.imageURL,
              isPrivate: post.isPrivate,
              dateCreated: post.dateCreated,
              dateLastUpdated: post.dateLastUpdated,
              author: post.author,
              commentsCount: post.commentsCount,
              likes: post.likesCount
              }));
          }

        public async createPost(userId: string, postToCreate: CreatePostDTO) {
            const foundUser = await this.userRepo.findOne({where: {id: userId}});
            if (foundUser === undefined || foundUser.isDeleted) {
                throw new NotFoundException('No such user found');
              }

            const newPost: Post = this.postRepo.create(postToCreate);
            newPost.author = foundUser;
            return await this.postRepo.save(newPost);
        }
}

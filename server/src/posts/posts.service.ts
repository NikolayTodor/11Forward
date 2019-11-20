import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '../data/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDTO } from '../models/posts/create-post.dto';
import { User } from '../data/entities/user.entity';

@Injectable()
export class PostsService {

    public constructor(
        @InjectRepository(Post) private readonly postRepo: Repository<Post>,
        @InjectRepository(User) private readonly userRepo: Repository<User>) {}

        public async createPost(userId: string, postToCreate: CreatePostDTO) {
            const foundUser = await this.userRepo.findOne({where: {id: userId}});
            if (foundUser === undefined || foundUser.isDeleted) {
                throw new NotFoundException('No such user found');
              }

            const newPost: Post = this.postRepo.create(postToCreate);
            newPost.user = Promise.resolve(foundUser);
            return await this.postRepo.save(newPost);
        }
}

import { UsersDataService } from './users-data.service';
import { UsersController } from './users.controller';
import { User } from './../data/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Post } from '../data/entities/post.entity';
import { Comment } from '../data/entities/comment.entity';
import { LikePost } from '../data/entities/like-post.entity';
import { LikeComment } from '../data/entities/like-comment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Post, Comment, LikePost, LikeComment])],

    controllers: [UsersController],

    providers: [UsersDataService],

    exports: [UsersDataService]
})
export class UsersModule {}

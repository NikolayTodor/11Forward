
import { Module } from '@nestjs/common';
import { Post } from '../data/entities/post.entity';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { User } from '../data/entities/user.entity';
import { Comment } from '../data/entities/comment.entity';
import { LikePost } from '../data/entities/like-post.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Post, User, Comment, LikePost])],

    controllers: [PostsController],

    providers: [PostsService],

    exports: [PostsService]
})
export class PostsModule {}

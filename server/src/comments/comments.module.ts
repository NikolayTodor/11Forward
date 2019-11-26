import { Module } from '@nestjs/common';
import { LikeComment } from '../data/entities/like-comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../data/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { PostsController } from '../posts/posts.controller';
import { PostsService } from '../posts/posts.service';
import { Post } from '../data/entities/post.entity';
import { Comment } from '../data/entities/comment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Post, User, Comment, LikeComment]), AuthModule],

    controllers: [PostsController],

    providers: [PostsService],

    exports: [PostsService]
})
export class CommentsModule {}

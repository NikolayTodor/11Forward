import { Module, Post } from '@nestjs/common';
import { LikeComment } from 'src/data/entities/like-comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/data/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PostsController } from 'src/posts/posts.controller';
import { PostsService } from 'src/posts/posts.service';

@Module({
    imports: [TypeOrmModule.forFeature([Post, User, Comment, LikeComment]), AuthModule],

    controllers: [PostsController],

    providers: [PostsService],

    exports: [PostsService]
})
export class CommentsModule {}

import { Module } from '@nestjs/common';
import { LikeComment } from '../data/entities/like-comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../data/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { Post } from '../data/entities/post.entity';
import { Comment } from '../data/entities/comment.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
    imports: [TypeOrmModule.forFeature([Post, User, Comment, LikeComment]), AuthModule],

    controllers: [CommentsController],

    providers: [CommentsService],

    exports: [CommentsService]
})
export class CommentsModule {}

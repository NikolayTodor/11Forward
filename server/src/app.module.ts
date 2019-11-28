import { DatabaseModule } from './data/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { ApiSystemErrorFilter } from './common/filters/api-error.filter';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { CoreModule } from './common/core.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, CoreModule, PostsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: ApiSystemErrorFilter,
    }],
})
export class AppModule {}

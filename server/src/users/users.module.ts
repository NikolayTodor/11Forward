
import { UsersDataService } from './users-data.service';
import { UsersController } from './users.controller';
import { User } from './../data/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([User])],

    controllers: [UsersController],

    providers: [UsersDataService],

    exports: [UsersDataService]
})
export class UsersModule {}

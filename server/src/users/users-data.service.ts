import { ApiSystemError } from './../common/exceptions/api-system.error';
import { AuthUserDTO } from './../models/users/auth-user.dto';
import { ShowUserDTO } from './../models/users/show-user.dto';
import { User } from './../data/entities/user.entity';
import { CreateUserDTO } from './../models/users/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersDataService {

    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ) {

    }

    public async findUserByCredential(credential: string): Promise<ShowUserDTO> {
        const foundUser: User = await this.userRepo.findOne({

          where: [
            { username: credential },
            { email: credential }
          ]

        });

        return plainToClass(ShowUserDTO, foundUser, {
          excludeExtraneousValues: true,
        });
      }

      public async validateUserPassword(user: AuthUserDTO): Promise<boolean> {
        const userEntity: User = await this.userRepo.findOne({
          where: [
            { username: user.credential },
            { email: user.credential }
          ],
        });

        return await bcrypt.compare(user.password, userEntity.password);
      }

    public async createUser(
        userToCreate: CreateUserDTO
    ) {
        const foundUser: User = await this.userRepo.findOne({
          where: [
            { username: userToCreate.username },
            { email: userToCreate.email }
          ],
        });

        if (foundUser) {
            throw new Error('User with such username/email already exists!');
        }

       const newUser: User = this.userRepo.create(userToCreate);
       newUser.password = await bcrypt.hash(userToCreate.password, 10);
       newUser.followers = Promise.resolve([]);
       newUser.following = Promise.resolve([]);
       return await this.userRepo.save(newUser);

    }

      // ---- test method for displaying user with following and followers ------ //
      public async showFollow (userName: string) {
        const userFollowingAndFollowers = await this.userRepo.findOne({
          where: {username: userName},
          relations: ['followers', 'following']
        });

        return userFollowingAndFollowers;
      }
    // ------ --------- //

    public async followUser (userName: string, followUserName: string) {

      if (userName.toLowerCase() === followUserName.toLowerCase()) {
        throw new ApiSystemError('You can not follow yourself!', 500);
      }

      const userFollower: User = await this.userRepo.findOne({
        where: {username: userName},
        relations: ['following']
      });

      const userToFollow: User = await this.userRepo.findOne({
        where: { username: followUserName },
      });

      const followedUsers: User[] = [...await userFollower.following];
      if (followedUsers.find((_user: User) => _user.username.toLowerCase() === followUserName.toLowerCase())) {
       throw new ApiSystemError('Can not follow same user twice!', 500);
      }

      userFollower.following = Promise.resolve([...await userFollower.following, userToFollow]);

      //1) const count = await this.userRepo.count() zaiavka
      //2) zapis broika na frontend i da namaliavam s inkrementacia i dekrementacia
      
      await this.userRepo.save(userFollower);
      await this.userRepo.save(userToFollow);

      return userFollower;
    }

    public async unfollowUser(userName: string, unfollowUserName: string) {

      const userFollower: User = await this.userRepo.findOne({
        where: {username: userName},
        relations: ['following']
      });

      const userToUnFollow: User = await this.userRepo.findOne({
        where: { username: unfollowUserName },
      });

      const followedUsers: User[] = [...await userFollower.following]
      .filter(_user => _user.username.toLowerCase() !== unfollowUserName.toLowerCase() );

      userFollower.following = Promise.resolve([...followedUsers]);

      this.userRepo.save(userFollower);
      this.userRepo.save(userToUnFollow);

      return userFollower;

    }

}

import { AuthUserDTO } from './../models/users/auth-user.dto';
import { ShowUserDTO } from './../models/users/show-user.dto';
import { User } from './../data/entities/user.entity';
import { CreateUserDTO } from './../models/users/create-user.dto';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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

    public async followUser (userId: string, followUserId: string) {

      console.log(userId)
      console.log(followUserId)

      const userFollower: User = await this.userRepo.findOne({
        where: {userId},
        relations: ['following']
      });

      const userToFollow: User = await this.userRepo.findOne(followUserId);

      console.log(userToFollow);

      userFollower.following = Promise.resolve([...await userFollower.following, userToFollow]);
      await this.userRepo.save(userFollower);
      await this.userRepo.save(userToFollow);

      return userFollower;

    }

    // ---- test method for displaying user ------ //
      public async showFollow (userId: string) {
        const userFollowingAndFollowers = await this.userRepo.findOne({
          where: {id: userId},
          relations: ['followers', 'following']
        })

        return userFollowingAndFollowers;
      }
    // ------ --------- //

    public async unfollowUser(userId: string, followedUserId: string) {

      const userFollower: User = await this.userRepo.findOne(userId);
     

      const userToUnFollow: User = await this.userRepo.findOne(followedUserId);
     

      userFollower.following = Promise.resolve([...await userFollower.following].filter(
        followedUser => followedUser !== userToUnFollow
      ));

      this.userRepo.save(userFollower);
      this.userRepo.save(userToUnFollow);

      return userFollower;

    }


}
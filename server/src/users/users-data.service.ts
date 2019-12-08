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
import { ShowUserProfileDTO } from 'src/models/users/show-user-profile.dto';


@Injectable()
export class UsersDataService {

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>) {}

  public async getAllUsers(): Promise<ShowUserProfileDTO[]> {
    const foundUsers = await this.userRepo.find({
      where: {
        isDeleted: false
      }
    });

    return foundUsers.map((user: User) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      followersCount: user.followersCount,
      followingCount: user.followingCount
    }));
  }

  public async getOneUser(loggedUserId: string, userId: string): Promise<ShowUserProfileDTO> {

    const foundUser = await this.userRepo.findOne({
      where: {
        id: userId
      },
      relations: ['followers']
    });

    if (!foundUser) {
      throw new ApiSystemError('No such user found!', 404);
    }

      const checkIfFollowed = await foundUser.followers.
      then(data => data.some(follower => follower.id === loggedUserId));

      const checkIfOwner = foundUser.id === loggedUserId;

    return {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      followersCount: foundUser.followersCount,
      followingCount: foundUser.followingCount,
      isFollowed: checkIfFollowed,
      isOwner: checkIfOwner
    };
  }

  public async getFollowers(userId: string): Promise<ShowUserProfileDTO[]> {
    const foundUser = await this.userRepo.findOne({
      where: { id: userId },
    });

    const userFollowers = await foundUser.followers;

    return userFollowers.map((user: User) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      followersCount: user.followersCount,
      followingCount: user.followingCount
    }));
  }

  public async getFollowing(userId: string): Promise<ShowUserProfileDTO[]> {
    const foundUser = await this.userRepo.findOne({
      where: { id: userId }
    });

    if (!foundUser) {
      throw new ApiSystemError('No such user found!', 404);
    }

    const userFollowing = await foundUser.following;

    return userFollowing.map((user: User) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      followersCount: user.followersCount,
      followingCount: user.followingCount
    }));
  }

  public async findUserByCredential(credential: string): Promise<ShowUserDTO> {
    const foundUser: User = await this.userRepo.findOne({

      where: [{
          username: credential
        },
        {
          email: credential
        }
      ]

    });

    return plainToClass(ShowUserDTO, foundUser, {
      excludeExtraneousValues: true,
    });
  }

  public async validateUserPassword(user: AuthUserDTO): Promise<boolean> {
    const userEntity: User = await this.userRepo.findOne({
      where: [{
          username: user.credential
        },
        {
          email: user.credential
        }
      ],
    });

    return await bcrypt.compare(user.password, userEntity.password);
  }

  public async createUser(
    userToCreate: CreateUserDTO
  ) {
    const foundUser: User = await this.userRepo.findOne({
      where: [{
          username: userToCreate.username
        },
        {
          email: userToCreate.email
        }
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

  public async followUser(userName: string, followUserName: string) {

    if (userName.toLowerCase() === followUserName.toLowerCase()) {
      throw new ApiSystemError('You can not follow yourself!', 500);
    }

    const userFollower: User = await this.userRepo.findOne({
      where: {
        username: userName
      },
      relations: ['following']
    });

    const userToFollow: User = await this.userRepo.findOne({
      where: {
        username: followUserName
      },
    });

    if (!userToFollow) {
      throw new ApiSystemError('No such user found!', 404);
    }

    const followedUsers: User[] = [...await userFollower.following];
    if (followedUsers.find((_user: User) => _user.username.toLowerCase() === followUserName.toLowerCase())) {
      throw new ApiSystemError('Can not follow same user twice!', 500);
    }

    userFollower.following = Promise.resolve([...await userFollower.following, userToFollow]);
    await this.userRepo.save(userFollower);
    await this.userRepo.save(userToFollow);

    return {
      id: userToFollow.id,
      username: userToFollow.username,
      email: userToFollow.email,
      followersCount: userToFollow.followersCount,
      followingCount: userToFollow.followingCount,
      isFollowed: true,
    };
  }

  public async unfollowUser(userName: string, unfollowUserName: string) {

    const userFollower: User = await this.userRepo.findOne({
      where: {
        username: userName
      },
      relations: ['following']
    });

    const userToUnFollow: User = await this.userRepo.findOne({
      where: {
        username: unfollowUserName
      },
    });

    if(!userToUnFollow) {
      throw new ApiSystemError('No such user found!', 400);
    }

    const followedUsers: User[] = [...await userFollower.following]
      .filter(_user => _user.username.toLowerCase() !== unfollowUserName.toLowerCase());

    userFollower.following = Promise.resolve([...followedUsers]);

    this.userRepo.save(userFollower);
    this.userRepo.save(userToUnFollow);

    return {
      id: userToUnFollow.id,
      username: userToUnFollow.username,
      email: userToUnFollow.email,
      followersCount: userToUnFollow.followersCount,
      followingCount: userToUnFollow.followingCount,
      isFollowed: false,
    }

  }

}

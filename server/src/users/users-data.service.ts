import { UpdateUserDTO } from './../models/users/update-user.dto';
import { ApiSystemError } from './../common/exceptions/api-system.error';
import { AuthUserDTO } from './../models/users/auth-user.dto';
import { ShowUserDTO } from './../models/users/show-user.dto';
import { User } from './../data/entities/user.entity';
import { CreateUserDTO } from './../models/users/create-user.dto';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { ShowUserProfileDTO } from 'src/models/users/show-user-profile.dto';
import axios from 'axios';
import { LikePost } from '../data/entities/like-post.entity';
import { Post } from '../data/entities/post.entity';
import { Comment } from '../data/entities/comment.entity';
import { LikeComment } from '../data/entities/like-comment.entity';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class UsersDataService {

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
    @InjectRepository(LikeComment) private readonly likeCommentRepo: Repository<LikeComment>,
    @InjectRepository(LikePost) private readonly likePostRepo: Repository<LikePost>,
    ) {}

  public async getAllUsers(take: number, skip: number): Promise<ShowUserProfileDTO[]> {
    const foundUsers = await this.userRepo.find({
      where: {
        isDeleted: false
      },
      order: { username: 'ASC' },
      take,
      skip: take * skip
    });

    return foundUsers.map((user: User) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      avatarURL: user.avatarURL,
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
      avatarURL: foundUser.avatarURL,
      followersCount: foundUser.followersCount,
      followingCount: foundUser.followingCount,
      isFollowed: checkIfFollowed,
      isOwner: checkIfOwner
    };
  }

  public async getFollowers(userId: string, take: number, skip: number): Promise<ShowUserProfileDTO[]> {
    const foundUser = await this.userRepo.findOne({
      where: { id: userId }
    });

    const userFollowers = await foundUser.followers;
    userFollowers.sort((a, b) => (a.username > b.username) ? 1 : -1 );
    userFollowers.splice(0, take * skip);
    userFollowers.splice(take, userFollowers.length);

    return userFollowers.map((user: User) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      avatarURL: user.avatarURL,
      followersCount: user.followersCount,
      followingCount: user.followingCount
    }));
  }

  public async getFollowing(userId: string, take: number, skip: number): Promise<ShowUserProfileDTO[]> {
    const foundUser = await this.userRepo.findOne({
      where: { id: userId }
    });

    if (!foundUser) {
      throw new ApiSystemError('No such user found!', 404);
    }

    const userFollowing = await foundUser.following;
    userFollowing.sort((a, b) => (a.username > b.username) ? 1 : -1 );
    userFollowing.splice(0, take * skip);
    userFollowing.splice(take, userFollowing.length);

    return userFollowing.map((user: User) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      avatarURL: user.avatarURL,
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
      throw new ApiSystemError('User with such username/email already exists!', 404);
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
      avatarUrl: userToFollow.avatarURL,
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
      avatarUrl: userToUnFollow.avatarURL,
      followersCount: userToUnFollow.followersCount,
      followingCount: userToUnFollow.followingCount,
      isFollowed: false,
      isOwner: false,
    }

  }

  public async updateUser(updateInfo: UpdateUserDTO, loggedUserId: string, usertoUpdateId: string) {

    if (loggedUserId !== usertoUpdateId) {
      throw new ApiSystemError('You can not update other members profile!', 401);
    }

    const foundUser: User = await this.userRepo.findOne({id: usertoUpdateId});

    if (updateInfo.base) {
      const correctBase = updateInfo.base.slice(22);
      const newURL = await this.uploadPhoto(correctBase);
      foundUser.avatarURL = newURL;
    }

    if (updateInfo.password) {
      updateInfo.password = await bcrypt.hash(updateInfo.password, 10);
    }

    Object.keys(updateInfo).forEach((prop: string) => {
      if ((updateInfo as any)[prop] !== undefined && (updateInfo as any)[prop] !== '') {
          (foundUser as any)[prop] = (updateInfo as any)[prop];
      }
  });

    await this.userRepo.save(foundUser);

    return {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      avatarUrl: foundUser.avatarURL,
      followersCount: foundUser.followersCount,
      followingCount: foundUser.followingCount,
      isFollowed: false,
      isOwner: true,
    };
  }

  public async uploadPhoto(base: string): Promise<string> {

  try {
    const data = await axios(`https://api.imgur.com/3/upload`, {
        method: 'POST',
        headers: {
           'Authorization': `Client-ID 7084d3c72f8fab9`,
        },
        data: {image: base},
      });
      return data.data.data.link;
  }
  catch(error) {
     console.log('error');
  }
  }

  public async deleteUser(requesterId: string, userId: string) {
    if (userId !== requesterId) {
      throw new ApiSystemError(`You don't have permission to delete other people's profiles!`, 403);
    }

    const userToDelete: User = await this.userRepo.findOne({id: userId});
    if (!userToDelete || userToDelete.isDeleted === true) {
      throw new ApiSystemError(`No such user exists!`, 404);
    }

    userToDelete.isDeleted = true;

    await this.userRepo.save(userToDelete);

    const foundPostLikes = await this.likePostRepo.find({where: {user: userId}});
      if (foundPostLikes.length) {
        foundPostLikes.forEach(async (like: LikePost) => await this.likePostRepo.delete(like));
      }

    const foundCommentLikes = await this.likeCommentRepo.find({where: {user: userId}});
      if (foundCommentLikes.length) {
        foundCommentLikes.forEach(async (like: LikeComment) => await this.likeCommentRepo.delete(like));
      }

    const foundPosts = await this.postRepo.find({where: {author: userId}});
      if (foundPosts.length) {
        foundPosts.forEach(async (post: Post) => {
          post.isDeleted = true;
          await this.postRepo.save(post);
        });
      }

    const foundComments = await this.commentRepo.find({where: {author: userId}});
      if (foundComments.length) {
        foundComments.forEach(async (comment: Comment) => {
          comment.isDeleted = true;
          await this.commentRepo.save(comment);
        });
      }

      return {msg: 'User successfully deleted!'};
  }

}

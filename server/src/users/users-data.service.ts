
import { UpdateUserDTO } from './../models/users/update-user.dto';
import { ApiSystemError } from './../common/exceptions/api-system.error';
import { AuthUserDTO } from './../models/users/auth-user.dto';
import { ShowUserDTO } from './../models/users/show-user.dto';
import { User } from './../data/entities/user.entity';
import { CreateUserDTO } from './../models/users/create-user.dto';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { LikePost } from '../data/entities/like-post.entity';
import { Post } from '../data/entities/post.entity';
import { Comment } from '../data/entities/comment.entity';
import { LikeComment } from '../data/entities/like-comment.entity';
import { PostsService } from '../posts/posts.service';
import { CommentsService } from '../comments/comments.service';
import { PhotoUploadService } from '../common/services/photo-upload.service';

@Injectable()
export class UsersDataService {

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
    @InjectRepository(LikeComment) private readonly likeCommentRepo: Repository<LikeComment>,
    @InjectRepository(LikePost) private readonly likePostRepo: Repository<LikePost>,
     private readonly commentsService: CommentsService,
     private readonly postsService: PostsService,
     private readonly photoService: PhotoUploadService,
    ) {}

  public async getAllUsers(take: number, skip: number) {
    const foundUsers = await this.userRepo.find({
      where: {
        isDeleted: false
      },
      order: { username: 'ASC' },
      take,
      skip: take * skip
    });

    return foundUsers;
  }

  public async getOneUser(loggedUserId: string, userId: string) {

    const foundUser = await this.userRepo.findOne({
      where: {
        id: userId
      },
      relations: ['followers']
    });

    if (!foundUser) {
      throw new ApiSystemError('No such user found!', 404);
    }

  const checkIfFollowed = await this.checkIfFollowed(foundUser, loggedUserId);
  const checkIfOwner = foundUser.id === loggedUserId;

    return {...foundUser, isFollowed: checkIfFollowed, isOwner: checkIfOwner };
  }

  public async getFollowers(userId: string, take: number, skip: number) {
    const foundUser = await this.userRepo.findOne({
      where: { id: userId }
    });

    const userFollowers = await foundUser.followers;
    userFollowers.sort((a, b) => (a.username > b.username) ? 1 : -1 );
    userFollowers.splice(0, take * skip);
    userFollowers.splice(take, userFollowers.length);

    return userFollowers;
  }

  public async getFollowing(userId: string, take: number, skip: number) {
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

    return userFollowing;
  }

  public async findUserByCredential(credential: string): Promise<ShowUserDTO> {
    const foundUser: User = await this.userRepo.findOne({

      where: [{
          username: credential,
          isDeleted: false
        },
        {
          email: credential,
          isDeleted: false
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
      throw new ApiSystemError('Can not follow same user twice!', 400);
    }

    userFollower.following = Promise.resolve([...await userFollower.following, userToFollow]);
    await this.userRepo.save(userFollower);
    await this.userRepo.save(userToFollow);

    return {
     ...userToFollow,
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

    if (!userToUnFollow) {
      throw new ApiSystemError('No such user found!', 400);
    }

    if (!this.checkIfFollowed(userToUnFollow, userFollower.id)) {
      throw new ApiSystemError('You can not unfollow user you dont follow!', 400)
    }

    const followedUsers: User[] = [...await userFollower.following]
      .filter(_user => _user.username.toLowerCase() !== unfollowUserName.toLowerCase());

    userFollower.following = Promise.resolve([...followedUsers]);

    this.userRepo.save(userFollower);
    this.userRepo.save(userToUnFollow);

    return {
      ...userToUnFollow,
      isFollowed: false,
    };

  }

  public async updateUser(updateInfo: UpdateUserDTO, loggedUserId: string, usertoUpdateId: string) {

    if (loggedUserId !== usertoUpdateId) {
      throw new ApiSystemError('You can not update other members profile!', 401);
    }

    const foundUser: User = await this.userRepo.findOne({id: usertoUpdateId});

    if (updateInfo.base) {
      const correctBase = updateInfo.base;
      const newURL = await this.photoService.uploadPhoto(correctBase);
      if (newURL !== undefined) {
        foundUser.avatarURL = newURL;
      } else {
        throw new ApiSystemError('New avatar image failed to upload', 400);
      }
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

    return {...foundUser, isFollowed: false, isOwner: true,
    };
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
        await Promise.all(foundPostLikes.map(async (like: LikePost) => await this.likePostRepo.delete(like)));
      }

    const foundCommentLikes = await this.likeCommentRepo.find({where: {user: userId}});
      if (foundCommentLikes.length) {
        await Promise.all(foundCommentLikes.map(async (like: LikeComment) => await this.likeCommentRepo.delete(like)));
      }

    const foundPosts = await this.postRepo.find({where: {author: userId}});
      if (foundPosts.length) {
        await Promise.all(foundPosts.map(async (post: Post) => {
          await this.postsService.deletePost(userId, post.id);
        }));
      }

    const foundComments = await this.commentRepo.find({where: {author: userId}});
      if (foundComments.length) {
        await Promise.all(foundComments.map(async (comment: Comment) => {
          await this.commentsService.deleteComment(userId, comment.id);
        }));
      }

      return {msg: 'User successfully deleted!'};
  }

  private async checkIfFollowed(foundUser: User, loggedUserId: string): Promise<boolean> {
    return await foundUser.followers.
      then((data: User[]) => data.some((follower: User) => follower.id === loggedUserId));
  }
}

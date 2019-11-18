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

    public async findUserByUsername(username: string): Promise<ShowUserDTO> {
        const foundUser: User = await this.userRepo.findOne({
          username,
          isDeleted: false,
        });

        return plainToClass(ShowUserDTO, foundUser, {
          excludeExtraneousValues: true,
        });
      }

      public async validateUserPassword(user: AuthUserDTO): Promise<boolean> {
        const userEntity: User = await this.userRepo.findOne({
          username: user.username,
        });

        return await bcrypt.compare(user.password, userEntity.password);
      }

    public async createUser(
        userToCreate: CreateUserDTO
    ) {
        const foundUser: User = await this.userRepo.findOne({
            username: userToCreate.username,
        });

        if (foundUser) {
            throw new Error('User with such username already exists!');
        }

       const newUser: User = this.userRepo.create(userToCreate);
       newUser.password = await bcrypt.hash(userToCreate.password, 10);
       return await this.userRepo.save(newUser);

    }


}
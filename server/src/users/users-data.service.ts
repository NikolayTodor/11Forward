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
       return await this.userRepo.save(newUser);

    }


}
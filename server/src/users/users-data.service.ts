import { CreateUserDTO } from './../models/users/create-user.dto';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/data/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersDataService { 

    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ) {

    }

    public async createUser(
        userToCreate: CreateUserDTO
    ) {
        const foundUser: User = await this.userRepo.findOne({
            name: userToCreate.username,
        });

        if (foundUser) {
            throw new Error('User with such username already exists!');
        }

       const newUser: User = this.userRepo.create(userToCreate);
       newUser.password = await bcrypt.hash(userToCreate.password, 10);
       return await this.userRepo.save(newUser);

    }


}
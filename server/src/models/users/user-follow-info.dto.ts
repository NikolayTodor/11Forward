import { User } from './../../data/entities/user.entity';
import { SingleUserDTO } from './single-user.dto';
import { Publish } from './../../transformer/decorators/publish';

export class UserFollowInfoDTO {

    @Publish()
    public id: string;

    @Publish()
    public username: string;

    @Publish(SingleUserDTO)
    public followers: User[];

    @Publish(SingleUserDTO)
    public following: User[];
}
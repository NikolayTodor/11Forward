
import { Publish } from './../../transformer/decorators/publish';

export class UserFollowInfoDTO {

    @Publish()
    public id: string;

    @Publish()
    public username: string;

    @Publish()
    public email: string;

    @Publish()
    public avatarURL: string;

    @Publish()
    public  followersCount: number;

    @Publish()
    public  followingCount: number;
}

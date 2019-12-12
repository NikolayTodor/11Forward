import { Publish } from '../../transformer/decorators/publish';

export class UserProfileDTO {

    @Publish()
    public id: string;

    @Publish()
    public username: string;

    @Publish()
    public avatarURL: string;

    @Publish()
    public email: string;

    @Publish()
    public followersCount: number;

    @Publish()
    public followingCount: number;

    @Publish()
    public isFollowed: boolean;

    @Publish()
    public isOwner: boolean;

}
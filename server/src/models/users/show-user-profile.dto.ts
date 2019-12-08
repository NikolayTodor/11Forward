export class ShowUserProfileDTO {

    public id: string;

    public username: string;

    public email: string;

    public avatarUrl: string;

    public followersCount: number;

    public followingCount: number;

    public isFollowed?: boolean;

    public isOwner?: boolean;

}

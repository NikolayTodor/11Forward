import { Expose } from 'class-transformer';

export class ShowUserProfileDTO {

    @Expose()
    public id: string;

    @Expose()
    public username: string;

    @Expose()
    public email: string;

    @Expose()
    public followersCount: number;

    @Expose()
    public followingCount: number;

}

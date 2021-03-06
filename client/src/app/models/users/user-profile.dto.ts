export class ShowUserProfileDTO {
  public id: string;
  public username: string;
  public avatarURL: string;
  public email: string;
  public followersCount: number;
  public followingCount: number;
  public isFollowed?: boolean;
  public isOwner?: boolean;
}



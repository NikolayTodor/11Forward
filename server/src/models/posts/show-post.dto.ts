import { User } from '../../data/entities/user.entity';

export class ShowPostDTO {
    public id: string;
    public title: string;
    public content: string;
    public imageURL: string;
    public isPrivate: boolean;
    public dateCreated: Date;
    public dateLastUpdated: Date;
    public author: string;
    public commentsCount: number;
    public likes: number;
}

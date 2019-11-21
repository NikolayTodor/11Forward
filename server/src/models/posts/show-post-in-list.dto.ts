import { User } from '../../data/entities/user.entity';

export class ShowPostInListDTO {
    public id: string;
    public title: string;
    public content: string;
    public imageURL: string;
    public isPrivate: boolean;
    public dateCreated: Date;
    public dateLastUpdated: Date;
    public author: User;
    public commentsCount: number;
    public likes: number;
}

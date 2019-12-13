import { Publish } from '../../transformer/decorators/publish';
import { User } from '../../data/entities/user.entity';
import { ShowAuthorDTO } from '../users/show-author-dto';


export class ShowPostDTO {

    @Publish()
    public id: string;

    @Publish()
    public title: string;

    @Publish()
    public content: string;

    @Publish()
    public imageURL: string;

    @Publish()
    public isPrivate: boolean;

    @Publish()
    public dateCreated: string;

    @Publish()
    public dateLastUpdated: string;

    @Publish(ShowAuthorDTO)
    public author: User;

    @Publish()
    public commentsCount: number;

    @Publish()
    public likesCount: number;
}

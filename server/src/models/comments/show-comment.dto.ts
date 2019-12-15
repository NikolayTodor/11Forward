import { Publish } from '../../transformer/decorators/publish';
import { ShowAuthorDTO } from '../users/show-author-dto';
import { User } from '../../data/entities/user.entity';

export class ShowCommentDTO {
    @Publish()
    public id: string;

    @Publish()
    public content: string;

    @Publish()
    public dateCreated: string;

    @Publish()
    public dateLastUpdated: string;

    @Publish(ShowAuthorDTO)
    public author: User;

    @Publish()
    public likesCount: number;
}

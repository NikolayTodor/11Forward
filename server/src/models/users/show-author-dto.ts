import { Publish } from '../../transformer/decorators/publish';

export class ShowAuthorDTO {

@Publish()
 public id: string;

 @Publish()
 public username: string;

 @Publish()
 public avatarURL: string;
}

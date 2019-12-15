import { Publish } from './../../transformer/decorators/publish';

export class SingleUserDTO {

    @Publish()
    public id: string;

    @Publish()
    public username: string;
}

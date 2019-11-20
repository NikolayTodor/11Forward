import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity('likeComments')
export class LikeComment {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(type => User, user => user.likeComments)
    public user: Promise<User>;

    @ManyToOne(type => Comment, comment => comment.likeComments)
    public comment: Promise<Comment>;
}

import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('likePosts')
export class LikePost {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(type => User, user => user.likePosts)
    public user: Promise<User>;

    @ManyToOne(type => Post, post => post.likePosts)
    public post: Promise<Post>;
}

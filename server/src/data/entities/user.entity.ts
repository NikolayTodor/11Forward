import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, RelationCount, OneToMany } from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { LikeComment } from './like-comment.entity';
import { LikePost } from './like-post.entity';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({type: 'nvarchar', nullable: false, unique: true})
    public username: string;

    @Column({ type: 'nvarchar', nullable: false })
    public password: string;

    @Column({type: 'nvarchar', nullable: false})
    public email: string;

    @OneToMany(type => Post, post => post.author)
    public posts: Promise<Post[]>;

    @OneToMany(type => Comment, comment => comment.author)
    public comments: Promise<Comment[]>;

    @OneToMany(type => LikeComment, like => like.user)
    public likeComments: Promise<LikeComment[]>;

    @OneToMany(type => LikePost, like => like.user)
    public likePosts: Promise<LikePost[]>;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;

    @ManyToMany(type => User, user => user.following)
    @JoinTable()
    public followers: Promise<User[]>;

    @ManyToMany(type => User, user => user.followers)
    public following: Promise<User[]>;

    @RelationCount((user: User) => user.followers)
    public followersCount: number;

    @RelationCount((user: User) => user.following)
    public followingCount: number;

}

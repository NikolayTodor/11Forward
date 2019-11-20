import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { LikePost } from './like-post.entity';

@Entity('posts')
export class Post {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({type: 'nvarchar', nullable: false})
    public title: string;

    @Column({type: 'nvarchar', nullable: false})
    public content: string;

    @Column({type: 'nvarchar', nullable: false})
    public imageURL: string;

    @CreateDateColumn()
    public dateCreated: Date;

    @UpdateDateColumn()
    public dateLastUpdated: Date;

    @Column({type: 'bool', nullable: false})
    public isPrivate: boolean;

    @ManyToOne(type => User, user => user.posts)
    public user: Promise<User>;

    @OneToMany(type => Comment, comment => comment.post)
    public comments: Promise<Comment[]>;

    @OneToMany(type => LikePost, like => like.post)
    public likePosts: Promise<LikePost[]>;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;
}

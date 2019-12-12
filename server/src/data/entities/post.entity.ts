import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, RelationCount } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { LikePost } from './like-post.entity';

@Entity('posts')
export class Post {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({type: 'nvarchar', nullable: false})
    public title: string;

    @Column({type: 'text', nullable: false})
    public content: string;

    @Column({type: 'nvarchar', nullable: false})
    public imageURL: string;

    @Column({type: 'bool', default: true})
    public hasPermission: boolean;

    @CreateDateColumn()
    public dateCreated: string;

    @UpdateDateColumn()
    public dateLastUpdated: string;

    @Column({type: 'bool', nullable: false})
    public isPrivate: boolean;

    @ManyToOne(type => User, user => user.posts, {eager: true})
    public author: User;

    @OneToMany(type => Comment, comment => comment.post)
    public comments: Promise<Comment[]>;

    @Column({type: 'int', default: 0})
    public commentsCount: number;

    @OneToMany(type => LikePost, like => like.post, {eager: true})
    public likePosts: LikePost[];

    @RelationCount((post: Post) => post.likePosts)
    public likesCount: number;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;
}

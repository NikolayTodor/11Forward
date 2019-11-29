import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, OneToMany, RelationCount } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import { LikeComment } from './like-comment.entity';

@Entity('comments')
export class Comment {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({type: 'text', nullable: false})
    public content: string;

    @CreateDateColumn()
    public dateCreated: Date;

    @UpdateDateColumn()
    public dateLastUpdated: Date;

    @ManyToOne(type => User, user => user.comments, {eager: true})
    public author: User;

    @ManyToOne(type => Post, post => post.comments)
    public post: Promise<Post>;

    @OneToMany(type => LikeComment, like => like.comment)
    public likeComments: Promise<LikeComment[]>;

    @RelationCount((comment: Comment) => comment.likeComments)
    public likesCount: number;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;
}

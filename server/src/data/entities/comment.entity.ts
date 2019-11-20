import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('comments')
export class Comment {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({type: 'nvarchar', nullable: false})
    public content: string;

    @CreateDateColumn()
    public dateCreated: Date;

    @UpdateDateColumn()
    public dateLastUpdated: Date;

    @ManyToOne(type => User, user => user.comments)
    public user: Promise<User>;

    @ManyToOne(type => Post, post => post.comments)
    public post: Promise<Post>;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;
}

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';

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

    @OneToMany(type => Post, post => post.user)
    public posts: Promise<Post[]>;

    @OneToMany(type => Comment, comment => comment.user)
    public comments: Promise<Comment[]>;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;
}

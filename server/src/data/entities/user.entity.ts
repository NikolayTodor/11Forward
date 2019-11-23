
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, RelationCount } from "typeorm";

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
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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

}
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('users')
export class User {

    @PrimaryColumn('uuid')
    public id: string;

    @Column({type: 'nvarchar', nullable: false, unique: true})
    public name: string;

    @Column({ type: 'nvarchar', nullable: false })
    public password: string;

    @Column({type: 'nvarchar', nullable: false})
    public email: string;

}
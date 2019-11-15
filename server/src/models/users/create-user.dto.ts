import {IsString, IsNotEmpty, Length, IsEmail} from 'class-validator';

export class CreateUserDTO {

    @IsString()
    @IsNotEmpty()
    @Length(4, 15)
    public username: string;

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 15)
    public password: string;
}

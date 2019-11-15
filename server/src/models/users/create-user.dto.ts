import {IsString, IsNotEmpty, Length} from 'class-validator';

export class CreateUserDTO {

    @IsString()
    @IsNotEmpty()
    @Length(4, 15)
    public username: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 15)
    public password: string;
}

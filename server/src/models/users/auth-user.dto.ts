import { IsString, IsNotEmpty, Length } from "class-validator";

export class AuthUserDTO {

    @IsString()
    @IsNotEmpty()
    @Length(4, 15)
    public username: string;

    @IsString()
    @IsNotEmpty()
    @Length(4, 15)
    public password: string;
}
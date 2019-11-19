import { IsString, IsNotEmpty, Length } from "class-validator";

export class AuthUserDTO {

    @IsString()
    @IsNotEmpty()
    @Length(2, 20)
    public username: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 50)
    public password: string;
}
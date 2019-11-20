import { IsString, IsNotEmpty } from "class-validator";

export class AuthUserDTO {

    @IsString()
    @IsNotEmpty()
    public credential: string;

    @IsString()
    @IsNotEmpty()
    public password: string;
}
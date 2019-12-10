import { IsString, IsEmail, IsUrl, IsOptional, Length } from 'class-validator';

export class UpdateUserDTO {

    @IsOptional()
    @IsString()
    @Length(4, 20)
    public username?: string;

    @IsOptional()
    @IsString()
    @Length(6, 20)
    public password?: string;

    @IsOptional()
    @IsEmail()
    public email?: string;

    @IsOptional()
    @IsString()
    public base?: string;

    @IsOptional()
    @IsUrl()
    public avatarURL?: string;
}

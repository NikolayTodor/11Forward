import { IsString, IsEmail, IsUrl, IsOptional } from 'class-validator';

export class UpdateUserDTO {

    @IsOptional()
    @IsString()
    public username?: string;

    @IsOptional()
    @IsString()
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
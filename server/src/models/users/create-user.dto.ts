import {IsString, IsNotEmpty, Length, IsEmail} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDTO {

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    @Length(4, 15)
    public username: string;

    @ApiModelProperty()
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    @Length(6, 15)
    public password: string;

}

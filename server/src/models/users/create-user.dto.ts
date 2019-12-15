import {IsString, IsNotEmpty, Length, IsEmail} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDTO {

    @ApiModelProperty({example: 'newUser'})
    @IsString()
    @IsNotEmpty()
    @Length(4, 20)
    public username: string;

    @ApiModelProperty({example: 'newUser@abv.bg'})
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @ApiModelProperty({example: 'newpassword'})
    @IsNotEmpty()
    @IsString()
    @Length(6, 20)
    public password: string;

}

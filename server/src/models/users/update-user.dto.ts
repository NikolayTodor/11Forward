import { IMAGE_BASE } from './../../common/misc/images/test.image';
import { IsString, IsEmail, IsUrl, IsOptional, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserDTO {

    @ApiModelProperty({example: 'updateUserName'})
    @IsOptional()
    @IsString()
    @Length(4, 20)
    public username?: string;

    @ApiModelProperty({example: 'updateUserPassword'})
    @IsOptional()
    @IsString()
    @Length(6, 20)
    public password?: string;

    @ApiModelProperty({example: 'update@UserPassword'})
    @IsOptional()
    @IsEmail()
    public email?: string;

    @ApiModelProperty({example: IMAGE_BASE.imgBase})
    @IsOptional()
    @IsString()
    public base?: string;

}

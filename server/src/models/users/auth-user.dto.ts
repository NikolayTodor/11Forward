import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthUserDTO {

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({example: 'niki'})
    public credential: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({example: 'predator666'})
    public password: string;
}

import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthUserDTO {

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({example: 'TestUser'})
    public credential: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({example: 'testPassword'})
    public password: string;
}

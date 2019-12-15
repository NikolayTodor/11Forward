import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ShowUserDTO {

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({example: '2501'})
    @Expose()
    public id: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({example: 'niki'})
    @Expose()
    public username: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({example: 'niki@abv.bg'})
    @Expose()
    public email: string;

}

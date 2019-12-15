import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsBoolean, IsOptional } from 'class-validator';
import { IMAGE_BASE } from '../../common/misc/images/test.image';

export class CreatePostDTO {
    @ApiModelProperty({example: 'my post'})
    @IsString()
    @IsNotEmpty()
    @Length(2, 60)
    public title: string;

    @ApiModelProperty({example: 'very good picture'})
    @IsString()
    @IsNotEmpty()
    @Length(5, 1000)
    public content: string;

    @ApiModelProperty({example: false})
    @IsBoolean()
    public isPrivate: boolean;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    public imageURL?: string;

    @ApiModelProperty({example: IMAGE_BASE.imgBase})
    @IsOptional()
    @IsString()
    public base?: string;

}

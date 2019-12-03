import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsUrl, IsBoolean } from 'class-validator';

export class CreatePostDTO {
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    @Length(2, 40)
    public title: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    @Length(10, 1000)
    public content: string;

    @IsUrl()
    public imageURL: string;

    @IsBoolean()
    public isPrivate: boolean;
}

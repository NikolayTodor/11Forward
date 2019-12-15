import { IsOptional, IsString, IsNotEmpty, Length, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdatePostDTO {

    @ApiModelProperty({example: 'updatePostTitle'})
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(2, 60)
    public title: string;

    @ApiModelProperty({example: 'updatePostContent'})
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(5, 1000)
    public content: string;

    @ApiModelProperty({example: false})
    @IsOptional()
    @IsBoolean()
    public isPrivate: boolean;
}

import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsUrl, IsBoolean, IsOptional } from 'class-validator';

export class CreatePostDTO {
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    @Length(2, 60)
    public title: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    @Length(5, 1000)
    public content: string;

    @IsBoolean()
    public isPrivate: boolean;

    @IsOptional()
    @IsString()
    public imageURL?: string;

    @IsOptional()
    @IsString()
    public base?: string;


}

// Suboptimal. CreatePostDTO receives its url only in
// the createPost servie, after base64 is send to imgur and
// returned as valid url. Should be considered for refactoring
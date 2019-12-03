import { IsOptional, IsString, IsNotEmpty, Length, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdatePostDTO {
    @IsOptional()
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    @Length(2, 40)
    public title: string;

    @IsOptional()
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    @Length(10, 1000)
    public content: string;

    @IsOptional()
    @IsBoolean()
    public isPrivate: boolean;
}

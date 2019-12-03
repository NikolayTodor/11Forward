import { IsOptional, IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateCommentDTO {
    @IsOptional()
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    @Length(10, 1000)
    public content: string;
}

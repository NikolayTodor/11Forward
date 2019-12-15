import { IsOptional, IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateCommentDTO {
    @IsOptional()
    @ApiModelProperty({example: 'My updated comment'})
    @IsString()
    @IsNotEmpty()
    @Length(5, 1000)
    public content: string;
}

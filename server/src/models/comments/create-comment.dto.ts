import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateCommentDTO {
    @ApiModelProperty({example: 'my new comment'})
    @IsString()
    @IsNotEmpty()
    @Length(5, 500)
    public content: string;
}

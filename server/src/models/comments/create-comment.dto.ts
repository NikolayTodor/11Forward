import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateCommentDTO {
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    @Length(10, 1000)
    public content: string;
}

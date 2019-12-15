
import { FollowActionType } from '../../common/enums/follow-action-type';
import { ApiModelProperty } from '@nestjs/swagger';

export class FollowUserDTO {
    @ApiModelProperty({ enum: ['follow', 'unFollow']})
    public action: FollowActionType;
}
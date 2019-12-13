import { Injectable } from '@nestjs/common';
import { ShowPostDTO } from '../../models/posts/show-post.dto';
import moment = require('moment');

@Injectable() 
export class DateTransforService
{
    public dateTransform(post: ShowPostDTO, property: any): string {
        const date: string = moment((post as any).property).startOf('minute').fromNow();
        return date;
    }
}

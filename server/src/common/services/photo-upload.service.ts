import { ConfigService } from '../../config/config.service';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PhotoUploadService {
    constructor(private readonly configService: ConfigService) {}

    public async uploadPhoto(base: string): Promise<string> {

        base = base.slice(22);

        try {
        const data = await axios(`https://api.imgur.com/3/upload`, {
            method: 'POST',
            headers: {
               Authorization: this.configService.imgurClientId
            },
            data: {image: base},
          });
          return data.data.data.link;
        } catch (error) {
         console.log(error);
        }
    }
}
